const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockPriceSchema = new Schema({
  symbol: { type: String, required: "Need Company Symbol" },
  date: {
    type: String,
    required: "What day is the stock data from?"
  },
  volume: Number,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  sma_open: Number,
  sma_high: Number,
  sma_low: Number,
  sma_close: Number,
  ema_open: Number,
  ema_high: Number,
  ema_low: Number,
  ema_close: Number,
  macd_open: Number,
  macd_high: Number,
  macd_low: Number,
  macd_close: Number,
  rsi_open: Number,
  rsi_high: Number,
  rsi_low: Number,
  rsi_close: Number,
  mom_open: Number,
  mom_high: Number,
  mom_low: Number,
  mom_close: Number,
  stoch_slowd: Number,
  stoch_slowk: Number,
  t3: Number
});

let StockPrice = mongoose.model("StockPrice", StockPriceSchema);

module.exports = StockPrice;