const router = require("express").Router();
const stockController = require("../../controllers/stockController");
const AIDelegate = require("../../controllers/AIDelegate");
// Matches with "api/stock/add/:symbol"
// Scrape new stock data.
router
  .route("/add/:symbol")
  .get(stockController.scrape);

// Matches with "api/stock/:symbol"
// to retrieve the specific stock data for front-end display
router
  .route("/:symbol")
  .get(stockController.getStock);

// Matches with "api/stock/train/:symbol"
// Trains and stores  a neural network for the given symbol if there are existing datasets
router
  .route("/train/:symbol")
  .get(AIDelegate.trainModelForStock)

// Matches with "api/stock/getPredictor/:symbol"
// Sends a JSON-serialized neural network with supporting constants to enable prediction
router
  .route("/getPredictor/:symbol")
  .get(AIDelegate.sendNeuralNet)

module.exports = router;
