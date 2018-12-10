import axios from "axios"

const brain = window.brain

export default {

    getNeuralNet: (symbol, cb) => {
        axios.get(`/api/stock/getPredictor/${symbol}`)
            .then(response => {
                const responseDetails = response.data[0]

                let { NeuralNet, __v, _id, date, ...predictionInterface } = responseDetails

                const net = new brain.NeuralNetwork()
                const serverNetInfo = JSON.parse(response.data[0].NeuralNet)
                predictionInterface["net"] = net.fromJSON(serverNetInfo)

                cb(predictionInterface)
            })
            .catch(err => {
                if (err) console.log(err)
            })
    },

    predict: (predictionInterface, userInputs) => {
        const { net, max, symbol, ...normalizers} = predictionInterface
        let neuralNetInput = {}

        Object.keys(normalizers).forEach(indicator => {
            // averages are at index 0, standard deviations are at index 1
            if (indicator in userInputs) {
                neuralNetInput[indicator] = (userInputs[indicator] - normalizers[indicator][0]) /  normalizers[indicator][1]
            } else {
                neuralNetInput[indicator] = normalizers[indicator][0]
            }
        })

        // Run the inputs against neural network
        const neuralNetOutput = net.run(neuralNetInput)

        // Adjust non-sense for when predicted low is greated than predicted high by swapping the two
        if (neuralNetOutput.low > neuralNetOutput.high) {
            const tempLow = neuralNetOutput.low
            neuralNetOutput.low = neuralNetOutput.high
            neuralNetOutput.high = tempLow
        }

        // Adjust for non-sense for when the opening price is higher than the predicted high or lower than the predicted low
        if (neuralNetOutput.open > neuralNetOutput.high) {
            neuralNetOutput.high = neuralNetOutput.open
        } else if (neuralNetOutput.open < neuralNetOutput.low) {
            neuralNetOutput.low = neuralNetOutput.open
        }

        // Adjust for non-sense for when the closing price is higher than the predicted high or lower than the predicted low
        if (neuralNetOutput.close > neuralNetOutput.high) {
            neuralNetOutput.high = neuralNetOutput.close
        } else if (neuralNetOutput.close < neuralNetOutput.low) {
            neuralNetOutput.low = neuralNetOutput.close
        }

        // Multiply the relative values by the scale
        for (let key in neuralNetOutput) {
            neuralNetOutput[key] *= max
        }

        return neuralNetOutput
    }
}