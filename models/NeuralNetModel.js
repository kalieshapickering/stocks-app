const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NeuralNetSchema = new Schema({
  symbol: { type: String, required: "Need Company Symbol" },
  date: Date,
  // Normalization functions
  // Index 0 is the average, while index 1 is the standard deviation
  sma_open: Array,
  sma_high: Array,
  sma_low: Array,
  sma_close: Array,
  ema_open: Array,
  ema_high: Array,
  ema_low: Array,
  ema_close: Array,
  macd_open: Array,
  macd_high: Array,
  macd_low: Array,
  macd_close: Array,
  rsi_open: Array,
  rsi_high: Array,
  rsi_low: Array,
  rsi_close: Array,
  mom_open: Array,
  mom_high: Array,
  mom_low: Array,
  mom_close: Array,
  t3_open: Array,
  t3_high: Array,
  t3_low: Array,
  t3_close: Array,
  // END avg stddev
  max: Number,
  NeuralNet: String
})

let NeuralNet = mongoose.model("NeuralNet", NeuralNetSchema);

module.exports = NeuralNet;