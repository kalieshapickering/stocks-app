const router = require("express").Router();
const stockRoutes = require("./stock");

// stock scraper routes
router.use("/stock", stockRoutes);

module.exports = router;
