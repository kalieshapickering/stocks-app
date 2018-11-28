const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockTickerSchema = new Schema({
  stockSymbol: {
    type: String,
    trim: true,
    unique: true,
    required: "Stock Symbol Required!"
  },
  companyName: {
    type: String,
    trim: true,
    required: "Company Name or else we can't filter for ids."
  }
});

let StockTicker = mongoose.model("StockTickers", StockTickerSchema);

module.exports = StockTicker;