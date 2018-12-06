const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  uuid: {
    type: String,
    unique: true,
    required: "Need to pass in a unique UUID for this article!"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
})

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;