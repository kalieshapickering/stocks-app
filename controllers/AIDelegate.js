const request = require("request")
const db = require("../models")
const brain = require("brain.js")

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
    const addOns = ['open', 'high', 'low', 'close']
    indicators.forEach(indicator => {
        specificIndicators = specificIndicators.concat(addOns.map(suffix => `${indicator}_${suffix}`))
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

const indicators = ['sma', 'ema', 'rsi', 'mom', 't3', 'macd']

module.exports = {

    trainModelForStock: (req, res) => {
        const companySymbol = req.params.symbol.toUpperCase()
        console.log(companySymbol)

        db.Stock
            .find({ 'symbol': companySymbol })
            .then(stockData => {
                if (stockData.length === 0) {
                    console.log("Something went wrong")
                    throw new Error("Stock data for given symbol was not found in training session")
                } else {
                    let filteredResponse = stockData.filter(dataset => {
                        return (Boolean(dataset["macd_low"]) && Boolean(dataset["t3_low"]) && Boolean(dataset["mom_low"]) && Boolean(dataset["rsi_low"]) && Boolean(dataset["ema_low"]) && Boolean(dataset["sma_low"]))
                    })
                    console.log(`${filteredResponse.length} of ${companySymbol}'s datasets include the majority of the indicators.`)
                    const normalizedData = normalizeData(filteredResponse)
                    console.log("Here is the now normalized data:")
                    console.log(normalizedData)
                    // TODO: Train off of this variable as input, with the four indicators as output
                }
            })
            .catch(err => res.json(err))
    }
}