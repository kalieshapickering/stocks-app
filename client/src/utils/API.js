import axios from "axios";

export default {
    // Gets all comments
    getComments: function() {
      return axios.get("/api");
    },
    // Saves comment to database
    postComments: function(comments) {
      return axios.post("/api", comments);
    }
  };
  