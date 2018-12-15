require("dotenv").config()
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require('./routes');
// connect Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsStocksDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
console.log(`NODE_ENV is ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === "production") {
  app.use("/static", express.static(path.join(__dirname, "client/build")));
}

// Make Public a static folder
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'client', 'public'));
}); 

// use route file
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
