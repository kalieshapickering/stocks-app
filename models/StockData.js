const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockDataSchema = new Schema({
  __tickerId: Schema.Types.ObjectId,
  date: {
    type: Date,
    required: "What day is the stock data from?"
  },
  open: {
    type: Number,
    required: "opening price please."
  },
  close: {
    type: Number,
    required: "closing price please."
  }
});

let StockData = mongoose.model("StockData", StockDataSchema);

module.exports = StockData;