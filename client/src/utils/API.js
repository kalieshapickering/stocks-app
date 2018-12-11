import axios from "axios";

export default {
    // Gets all comments
    getComments: function() {
      return axios.get("localhost:3001/api");
    },
    // Saves comment to database
    postComments: function(comments) {
      console.log(comments)
      return axios.post("localhost:3001/api", comments);
    }
  };
  