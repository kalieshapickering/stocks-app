const router = require("express").Router();
const commentController = require("../../controllers/commentController");

// Matches /api/comment/:uuid to pull all comments on article
router
  .route("/:uuid")
  .get(commentController.getComments)
  .post(commentController.postComment);

module.exports = router;