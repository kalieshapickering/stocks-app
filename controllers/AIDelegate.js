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
    console.log(normalizationHelpers)
    console.log("\n\nProcessing data to be normalized\n\n")
    let normalizedData = []
    // go through each dataset to be replaced by its normalized version
    data.forEach(dataset => {
        // the following object gets populated by its own indicator, only with a changed value
        let normalizedDataset = {}
        // loop through each specific indicator to modify the current dataset
        specificIndicators.forEach(indicator => {
            // get the current indicators average and standard deviation
            let normalizingHelpersForIndicator = normalizationHelpers[indicator]
            normalizedDataset[indicator] = (dataset[indicator] - normalizingHelpersForIndicator.average) / normalizingHelpersForIndicator.standardDeviation
        })
        normalizedData.push(normalizedDataset)
    })

    return { normalizedData, normalizationHelpers }
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
    let highPrices = arr.map(actual => actual.high)
    let max = Math.max(...highPrices)
    scaled = arr.map(output => {
        let outputLabel = {}
        intervals.forEach(interval => {
            outputLabel[interval] = output[interval] / max
        })
        return outputLabel
    })
    return { scaled, max }
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
                    const normalizeDataOutputs = normalizeData(filteredResponse)
                    const normalizedInput = normalizeDataOutputs.normalizedData
                    const helpers = normalizeDataOutputs.normalizationHelpers
                    let outputs = filterObjectArrayByKeys(filteredResponse, intervals)
                    const scaleByMaxOutput = scaleByMax(outputs)
                    const max = scaleByMaxOutput.max
                    outputs = scaleByMaxOutput.scaled
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
                        learningRate: 0.001,
                        activation: "relu",
                        binaryThresh: 0.5,
                        errorThresh: 0.05
                    }

                    const net = new brain.NeuralNetwork(config)
                    net.trainAsync(inputOutputArray, { log: true, iterations: 100 }).then((nnRes) => {
                        console.log(`\n\nDone in ${nnRes.iterations} iterations and with ${nnRes.error * 100}% error\n\n`)
                        const serializedNet = JSON.stringify(net.toJSON())

                        let documentToAdd = {
                            symbol: companySymbol,
                            date: new Date(),
                            max: max,
                            NeuralNet: serializedNet   
                        }
                        Object.keys(helpers).map(helperKey => {
                            documentToAdd[helperKey] = Object.values(helpers[helperKey])
                        })
                        console.log(documentToAdd)
                        db.NNModel.findOneAndUpdate({ 
                            symbol: companySymbol,
                            date: new Date().toLocaleDateString()
                        }, documentToAdd, { upsert: true }).then(result => res.json(result)).catch(err => console.log(err))
                    })
                }
            })
            .catch(err => res.json(err))
    }
}