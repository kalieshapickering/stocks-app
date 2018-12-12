import axios from "axios";

export default {
    // Gets all comments
    getComments: function() {
      return axios.get("/api/comment");
    },
    // Saves comment to database
    postComments: function(comments) {
      console.log(comments)
      return axios.post("/api/comment", comments);
    }
  };
  