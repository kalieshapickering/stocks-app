const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsArticleSchema = new Schema({
  __tickerId: Schema.Types.ObjectId,
  title: {
    type: String,
    trim: true,
    unique: true, // do we want this?
    required: "title is needed!"
  },
  publishedDate: {
    type: String,
    required: "Need published date."
  }
});

let NewsArticles = mongoose.model("NewsArticles", NewsArticleSchema);

module.exports = NewsArticles;