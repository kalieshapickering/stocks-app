const request = require("request")
const db = require("../models")
const brain = require("brain.js")

const intervals = ['open', 'high', 'low', 'close']

normalizeData = data => {
    standardDeviation = values => {
        const avg = average(values);

        const squareDiffs = values.map(value => {
            const diff = value - avg;
            const sqrDiff = diff * diff;
            return sqrDiff;
        });

        const avgSquareDiff = average(squareDiffs);

        const stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }

    average = data => {
        let sum = data.reduce((sum, value) => {
            return sum + value;
        }, 0);

        return sum / data.length
    }

    console.log("\n\nGetting average and standard deviation for data\n\n")
    const normalizationHelpers = {}
    let specificIndicators = []
    indicators.forEach(indicator => {
        specificIndicators = specificIndicators.concat(intervals.map(suffix => `${indicator}_${suffix}`))
    })
    console.log(`Array of each of the specific indicators to be used in preprocessing: ${specificIndicators}`)
    specificIndicators.forEach(indicator => {
        const arrayOfValuesForIndicator = data.map(dataset => dataset[indicator])
        const averageForIndicator = average(arrayOfValuesForIndicator)
        const standardDeviationForIndicator = standardDeviation(arrayOfValuesForIndicator)
        normalizationHelpers[indicator] = {
            average: averageForIndicator,
            standardDeviation: standardDeviationForIndicator
        }
    })

    console.log("\n\nProcessing data to be normalized\n\n")
    let normalizedData = []
    // go through each dataset to be replaced by its normalized version
    data.forEach(dataset => {
        // the following object gets populated by its own indicator, only with a changed value
        let normalizedDataset = {}
        // loop through each specific indicator to modify the current dataset
        specificIndicators.forEach(indicator => {
            // get the current indicators average and standard deviation
            normalizingHelpersForIndicator = normalizationHelpers[indicator]
            normalizedDataset[indicator] = (dataset[indicator] - normalizingHelpersForIndicator.average) / normalizingHelpersForIndicator.standardDeviation
        })
        normalizedData.push(normalizedDataset)
    })

    return normalizedData
}

const filterObjectArrayByKeys = (objArray, keys) => {
    let newObjArray = []
    objArray.forEach(obj => {
        let newObj = {}
        keys.forEach(key => {
            newObj[key] = obj[key]
        })
        newObjArray.push(newObj)
    })
    return newObjArray
}

const indicators = ['sma', 'ema', 'rsi', 'mom', 't3', 'macd']

const scaleByMax = (arr) => {
    let prices = arr.map(actual => actual.low)
    console.log("prices")
    console.log(prices)
    let max = Math.max(...prices)
    console.log("max")
    console.log(max)
    scaled = arr.map(output => {
        return { low: output.low / max }
    })
    return scaled
}

module.exports = {

    trainModelForStock: (req, res) => {
        const companySymbol = req.params.symbol.toUpperCase()
        console.log(companySymbol)

        db.Stock
            .find({ 'symbol': companySymbol })
            .sort({ 'date': -1 })
            .then(stockData => {
                if (stockData.length === 0) {
                    console.log("Something went wrong")
                    throw new Error("Stock data for given symbol was not found in training session")
                } else {
                    let filteredResponse = stockData.filter(dataset => {
                        return (Boolean(dataset["macd_low"]) && Boolean(dataset["t3_low"]) && Boolean(dataset["mom_low"]) && Boolean(dataset["rsi_low"]) && Boolean(dataset["ema_low"]) && Boolean(dataset["sma_low"]))
                    })
                    console.log(`${filteredResponse.length} of ${companySymbol}'s datasets include the majority of the indicators.`)
                    const normalizedInput = filterObjectArrayByKeys(filteredResponse, intervals)
                    console.log(intervals)
                    console.log("Input length")
                    console.log((normalizedInput[0]))
                    let outputs = filterObjectArrayByKeys(filteredResponse, ["low"])
                    outputs = scaleByMax(outputs)
                    console.log(Object.keys(normalizedInput[0]).length)
                    console.log("output length")
                    console.log(outputs)
                    let inputOutputArray = []
                    if (normalizedInput.length === outputs.length) {
                        for (let i = 0; i <= normalizedInput.length - 1; i++) {
                            inputOutputArray.push({ input: normalizedInput[i], output: outputs[i] })
                        }
                    }

                    // Train off of normalizedInput variable as input, with the four indicators as output
                    console.log("\n\nBeginning training...\n\n")
                    const config = {
                        hiddenLayers: [64, 64],
                        learningRate: 0.01,
                        activation: "sigmoid",
                        binaryThresh: 0.5,
                        // inputSize: 4,
                        // outputSize: 1
                    }

                    const net = new brain.NeuralNetwork(config)
                    // console.log(net)
                    net.train(inputOutputArray, { log: true, iterations: 500 })
                    console.log(":)")
                    // net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
                    //     {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
                    //     {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}])
                    // net.trainAsync(inputOutputArray, {log: true, logPeriod: 1}).then(res => {
                    //     console.log("Net after train")
                    //     console.log(net)
                    //     console.log(res)
                    //     console.log(`Trained model at ${res.iterations} iterations with ${res.error} error`)
                    //     console.log(res.error)
                    // }).catch(err => console.log(err))

                    console.log(":(")
                }
            })
            .catch(err => res.json(err))
    }
}