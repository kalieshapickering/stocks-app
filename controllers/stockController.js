const db = require("../models");
const alpha = require('alphavantage')({ key: 'N0P025QLK3BB7DUQ' });

// * BEGIN MODULE.EXPORTS API ROUTES *
module.exports = {

  scrape: (req, res) => {
    const companySymbol = req.params.symbol.toUpperCase();
    console.log(companySymbol);
    getStockPrices(companySymbol, res);

    // array of equity technical indicators whose data is required.
    let indicator = ['sma', 'ema', 'rsi', 'mom', 't3', 'macd', 'stoch'];
    // STOCH is first indicator to be popped, and has no series types.
    // each subsequent recursive funciton call will have an array of 4 series types.
    // possible series types = ['open', 'high', 'low', 'close']
    getTechnicalIndicator(companySymbol, ['no_series_type'], indicator.pop(), indicator);
  },

  getStock: (req, res) => {
    const symbol = req.params.symbol.toUpperCase();

    db.Stock
      .find({ 'symbol': symbol })
      .then(stockData => {
        if (stockData.length === 0) {
          res.json({
            'status': 'No data found',
            'message': `You can go to /api/stock/add/${symbol} to request new data be added to database.`
          });
        } else {
          res.redirect("/search").json(stockData);
        }
      })
      .catch(err => res.json(err));
  }
}

// * END MODULE.EXPORTS API ROUTES *

getStockPrices = (symbol, res) => {
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

      db.Stock
        .find({ symbol: symbol })
        .then(data => {
          res.json({
            'metadata': {
              'status': 'Seed/base data has been added',
              'message': `Please try your request at /api/stock/${symbol} in 15 minutes for the new data. Our servers are doing their best to retrieve all relevant indicators.`
            },
            'data': data
          })
        })
        .catch(err => console.log(`Error getting data: ${err}`))
    })
    .catch(err => console.log(`Error caught: ${err}`));
};

getTechnicalIndicator = (
  symbol,
  seriesTypeArray,
  technicalIndicator,
  remainingTechnicalIndicatorsArray
) => {

  seriesTypeArray.map(type => {
    // setting up paramters for alphaVantage api call.
    const queryOptions = [symbol, 'daily'];

    // if technical indicator is STOCH, don't add any other parameter options for
    // alphaVantage api call. If indicator is MACD, add 'type' into parameter options.
    // Otherwise for all other indicators, we need to push 'time_period'=60 and 'type'
    if (!(technicalIndicator === 'stoch')) {
      if (!(technicalIndicator === 'macd')) {
        queryOptions.push(60, type);
      } else {
        queryOptions.push(type);
      }
    }

    alpha.technical
    [technicalIndicator](...queryOptions) //(symbol, 'daily', 60, type)
      .then(data => {
        const dataKeys = Object.keys(data[`Technical Analysis: ${technicalIndicator.toUpperCase()}`]);
        // console.log(dataKeys);
        dataKeys.map(key => {
          let oneDay = data[`Technical Analysis: ${technicalIndicator.toUpperCase()}`][key];

          // * Build up the data object to be inserted into database with technical data *
          let dataToInsert = {};

          if (technicalIndicator !== 'stoch') {
            // the Stock model takes a key of technicalindicator and type combo.
            // 
            // VALUE in the data object is dynamically built for all tech indicators not
            // equal to STOCH.
            // IF tech indicator is 'macd' we use only one of the returning data points in the JSON
            // with an explicit string in index call.
            // ELSE, for all other tech indicators we use the 0-th index of the key in the oneDay obj.
            dataToInsert[`${technicalIndicator}_${type}`] =
              oneDay[
              technicalIndicator !== 'macd' ?
                Object.keys(oneDay)[0] :
                'MACD_Signal'
              ];
            console.log(dataToInsert);
          } else {
            // STOCH tech indicators require 2 data points to be collected.
            dataToInsert['stoch_slowd'] = oneDay['SlowD'];
            dataToInsert['stoch_slowk'] = oneDay['SlowK'];
            console.log(dataToInsert);
          }
          // * End data object build process *

          db.Stock
            .updateOne({
              'symbol': symbol,
              'date': key
            }, dataToInsert)
            .catch(err => console.log(`Update Error: ${err}`));
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  });

  // setting up a timer to space API calls 70 seconds out. AlphaVantage has a limit of 5 calls
  // per minute. By spacing out 70 second we limit errors from too many calls. The data takes
  // just under 8 minutes to be collected fully.
  if (remainingTechnicalIndicatorsArray.length > 0) {
    setTimeout(() => {
      getTechnicalIndicator(
        symbol,
        ['open', 'high', 'low', 'close'],
        remainingTechnicalIndicatorsArray.pop(),
        remainingTechnicalIndicatorsArray);
    }, 70 * 1000);
  }
};