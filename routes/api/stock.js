const router = require("express").Router();
const stockController = require("../../controllers/stockController");

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

module.exports = router;
