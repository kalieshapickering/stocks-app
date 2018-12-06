const router = require("express").Router();
const stockRoutes = require("./stock");
const commentRoutes = require("./comment");

// stock scraper routes
router.use("/stock", stockRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
