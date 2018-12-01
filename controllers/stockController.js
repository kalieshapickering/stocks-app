const db = require("../models");
const alpha = require('alphavantage')({ key: 'N0P025QLK3BB7DUQ'});

module.exports = {
  
  scrape: (req, res) => {
    const companySymbol = req.params.symbol.toUpperCase();
    console.log(companySymbol);
    // getStockPrices(companySymbol);
    getTechnicalIndicator(companySymbol, ['open', 'high', 'low', 'close'], 'macd');
  },

  getStock: (req, res) => {
    const symbol = req.params.symbol.toUpperCase();

    db.Stock
      .find({'symbol': symbol})
      .then(stockData => res.json(stockData))
      .catch(err => res.json(err));
  }
}

getStockPrices = symbol => {
  alpha.data
    .daily(symbol.toUpperCase(), 'full')
    .then(data => {
      const dataKeys = Object.keys(data['Time Series (Daily)']);
      dataKeys.map(key => {
        let oneDay = data['Time Series (Daily)'][key];
        db.Stock.findOneAndUpdate({
          symbol: data['Meta Data']['2. Symbol'],
          date: key
        }, {
          symbol: data['Meta Data']['2. Symbol'],
          date: key,
          open: oneDay['1. open'],
          high: oneDay['2. high'],
          low: oneDay['3. low'],
          close: oneDay['4. close'],
          volume: oneDay['5. volume']
        }, {
          upsert: true
        })
        .catch(err => console.log(`Error ${err}`));
      });

      return data; // Need to change this to do a find({}) and return data json
    })
    .catch(err => console.log(`Error caught: ${err}`));
};

getTechnicalIndicator = (symbol, seriesTypeArray, technicalIndicator) => {

  seriesTypeArray.map(type => {
    // setting up paramters for alphaVantage api call.
    const queryOptions = [symbol,'daily'];

    // if technical indicator is STOCH, don't add any other parameter options for
    // alphaVantage api call. If indicator is MACD, add 'type' into parameter options.
    // Otherwise for all other indicators, we need to push 'time_period'=60 and 'type'
    (!(technicalIndicator === 'stoch')) ? 
    (!(technicalIndicator === 'macd')) ? 
    queryOptions.push(60, type)
    : queryOptions.push(type) 
    : null;

    alpha.technical
      [technicalIndicator](...queryOptions) //(symbol, 'daily', 60, type)
      .then(data => {
        const dataKeys = Object.keys(data[`Technical Analysis: ${technicalIndicator.toUpperCase()}`]);
        console.log(dataKeys);
        dataKeys.map(key => {
          let oneDay = data[`Technical Analysis: ${technicalIndicator.toUpperCase()}`][key];
          console.log(oneDay);
          console.log(`${technicalIndicator}_${type}`);
          console.log(Object.keys(oneDay));
          db.Stock
            .updateOne({
              'symbol': symbol, 
              'date': key
            }, {
              [
                (!(technicalIndicator === 't3' || technicalIndicator === 'stoch')) ? 
                  `${technicalIndicator}_${type}` : 
                  technicalIndicator
              ] : oneDay[Object.keys(oneDay)[0]]
            })
            .catch(err => {console.log(`Update Error: ${err}`)})
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  });
};

// required parameters, no defaults
// alpha.technical.sma(symbol, interval, time_period, series_type)
// alpha.technical.ema(symbol, interval, time_period, series_type)
// alpha.technical.t3(symbol, interval, time_period, series_type)
// alpha.technical.rsi(symbol, interval, time_period, series_type)
// alpha.technical.mom(symbol, interval, time_period, series_type)
// alpha.technical.macd(symbol, interval, series_type) //MACD_signal only
// alpha.technical.stoch(symbol, interval) //no open high low close, two only