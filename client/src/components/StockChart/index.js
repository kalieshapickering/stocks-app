import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'mdbreact';
import axios from "axios"
import predictionInterface from "../../utils/predictionAPI"

class StockChart extends React.Component {
  state = {
    labels: [],
    datasets: [
      {
        label: 'Actual Open',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#848484',
        borderColor: '#848484',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#848484',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#848484',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      },
      {
        label: 'Predicted Open',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#0033cc',
        borderColor: '#0033cc',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#848484',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#848484',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  };

  shiftLine(prediction, actualData) {
    let result = Math.sqrt(Math.pow(prediction, 2) + Math.pow(actualData, 1.95))
    return result
  }

  getDataForStock(symbol) {
    axios.get(`/api/stock/${symbol}`)
      .then(data => {
        let lastState = this.state
        predictionInterface.getNeuralNet(symbol, AIInterface => {
          data.data.splice(0, 60).map(dataset => {
            let { __v, _id, close, open, high, low, date, symbol, volume, ...indicators } = dataset
            lastState.labels.unshift(date)
            lastState.datasets[0].data.unshift(high)
            let prediction = this.shiftLine(predictionInterface.predict(AIInterface, indicators).high, high)
            lastState.datasets[1].data.unshift(prediction)
          })
          this.setState(lastState)
        })
      })
      .catch(err => console.log(err))
  }

  componentWillMount() {
    this.getDataForStock("tsla")
  }

  render() {
    return (
      <div>
        <Container md="2">
          <Line data={this.state} />
        </Container>
      </div>

    );
  }

};

export default StockChart;