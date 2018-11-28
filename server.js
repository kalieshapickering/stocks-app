const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// require models
const db = require("./models");

// connect Mongoose
mongoose.connect("mongodb://localhost/newsStocksDB", { useNewUrlParser: true });

// NewsAPI
const NewsAPI = require('newsapi');
// need to env variable the token!
const newsapi = new NewsAPI('b1c5821e0a304d498a98a66ec9a01eb4');

for (let pageNum = 1; pageNum < 11; pageNum++) {
  newsapi.v2.everything({
    q: 'tesla',
    // sources: 'bbc-news,the-verge',
    // domains: 'bbc.co.uk, techcrunch.com',
    // from: '2007-12-01',
    // to: '2017-12-12',
    sortBy: 'relevancy',
    language: 'en', 
    pageSize: 100,
    page: pageNum
  })
  .then(response => {
    for (let articleNum = 0; articleNum < 100; articleNum++) {
      db.Article.create({
        title: response.articles[articleNum].title,
        publishedDate: response.articles[articleNum].publishedAt
      })
      .then(newArticle => console.log(`New article created: ${newArticle}`))
      .catch(err => console.log(err));
    }
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
}


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
