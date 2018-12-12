const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require('./routes');


// connect Mongoose
mongoose.connect("mongodb://localhost/newsStocksDB", { useNewUrlParser: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Public a static folder
app.get('/', function(req, res) {
  res.sendfile(path.resolve(__dirname, 'public', 'index.html'));
}); 

// use route file
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
