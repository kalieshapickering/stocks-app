const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const alpha = require('alphavantage')({ key: 'N0P025QLK3BB7DUQ'});

// require models
const db = require("./models");

// connect Mongoose
mongoose.connect("mongodb://localhost/newsStocksDB", { useNewUrlParser: true });

// temporary, once I move it to a controller 
// this will come from req.params
const symbol = ['TSLA', 'MSFT', 'AAPL', 'AMZN'];
symbol.map(key => {
  alpha.data
  .daily(key, 'full')
  .then(data => {
    const dataKeys = Object.keys(data['Time Series (Daily)']);
    dataKeys.map(key => {
      let oneDay = data['Time Series (Daily)'][key];
      db.Stock.create({
        symbol: data['Meta Data']['2. Symbol'],
        date: key,
        open: oneDay['1. open'],
        high: oneDay['2. high'],
        low: oneDay['3. low'],
        close: oneDay['4. close']
      })
      .then(newData => console.log(`Added new data point ${newData}`))
      .catch(err => console.log(`Error ${err}`));
    });
  });
});


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/hello/:name", (req, res) => {
  res.json({ "name":req.params.name });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
