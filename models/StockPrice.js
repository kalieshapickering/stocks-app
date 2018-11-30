const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockPriceSchema = new Schema({
  symbol: { type: String, required: "Need Company Symbol" },
  date: {
    type: Date,
    required: "What day is the stock data from?"
  },
  open: {
    type: Number,
    required: "opening price please."
  },
  high: {
    type: Number,
    required: "highest price of day please."
  },
  low: {
    type: Number,
    required: "lowest price of please."
  },
  close: {
    type: Number,
    required: "closing price please."
  }
});

let StockPrice = mongoose.model("StockPrice", StockPriceSchema);

module.exports = StockPrice;