const db = require("../models");

module.exports = {
  getComments: (req, res) => {
    db.Article.findOne({uuid: req.params.uuid})
      .populate("comments")
      .then(dbArticle => {
        if(dbArticle) {
          res.json(dbArticle.comments);
        } else {
          res.json({
            "Status": `No comment for UUID: ${req.params.uuid} was found.`
          })
        }
      })
      .catch(err => res.json(err));
  },

  postComment: (req, res) => {
    db.Comment.create({text: req.body.text})
      .then(dbComment => {
        return db.Article.findOneAndUpdate(
          {
            uuid: req.params.uuid,
            title: req.body.title
          },
          {$push: { comments: dbComment }},
          { 
            new: true,
            upsert: true
          }
        ).populate("comments");
      })
      .then(dbArticle => res.json(dbArticle.comments))
      .catch(err => res.json(err));
  }
}