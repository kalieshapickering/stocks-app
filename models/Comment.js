const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  text: String,
  date: { type: Date, default: Date.now}
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;