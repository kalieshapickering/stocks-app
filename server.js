require("dotenv").config()
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use("/static", express.static(path.join(__dirname, 'client/build')));
}

// use route file
app.use(routes);

// Make Public a static folder
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// }); 

// connect Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsStocksDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
