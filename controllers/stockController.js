const db = require("../models");
const alpha = require('alphavantage')({ key: 'N0P025QLK3BB7DUQ'});

module.exports = {
  
  scrape: (req, res) => {
    alpha.data
    .daily(req.params.symbol.toUpperCase(), 'full')
    .then(data => {
      const dataKeys = Object.keys(data['Time Series (Daily)']);
      dataKeys.map(key => {
        let oneDay = data['Time Series (Daily)'][key];
        db.Stock.create({
          symbol: data['Meta Data']['2. Symbol'],
          date: key,
          open: oneDay['1. open'],
          high: oneDay['2. high'],
          low: oneDay['3. low'],
          close: oneDay['4. close']
        })
        .catch(err => console.log(`Error ${err}`));
      });

      res.json(data);
    })
    .catch(err => console.log(`Error caught: ${err}`));
  },

  getStock: (req, res) => {
    const symbol = req.params.symbol.toUpperCase();

    db.Stock
      .find({'symbol': symbol})
      .then(stockData => res.json(stockData))
      .catch(err => res.json(err));
  }
}