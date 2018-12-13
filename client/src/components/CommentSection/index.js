import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import API from "../../utils/API";
import { List} from "../../components/List";
import CommentPost from "../../components/CommentPost";

class CommentSection extends Component {

  state = {
    comments: [],
    name: "",
    email: "",
    message: "",
    uuid: "",

  };

  // componentDidMount() {
  //   this.loadComments();
  // }

  // loadComments = () => {
  //   API.getComments()
  //     .then(res => 
  //       this.setState({ comments: res.data, name: "", email: "", message: "", uuid: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email) {
      API.postComments({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
        uuid: this.state.uuid
      })
        // .then(res => this.loadComments())
        // this.loadComments()
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <form>
                <p className="h5 text-center mb-4">Leave a Comment</p>
                <div className="grey-text">
                  <input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    className="form-control mr-sm-4"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                  <input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    className="form-control mr-sm-4"
                    placeholder="Type your email"
                    icon="envelope"
                    type="text"
                    name="email"
                  />
                  <input
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    className="form-control mr-sm-4"
                    type="textarea"
                    placeholder="Your message"
                    icon="pencil"
                    name="message"
                  />
                </div>
                <div className="text-center">
                  <MDBBtn
                    disabled={!(this.state.name && this.state.email)}
                    onClick={this.handleFormSubmit}
                  >Submit</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {this.state.comments.length ? (
          <List>
            {this.state.comments.map(comment => {
              return (
                <CommentPost key={comment._id}>
                  <a href={"/api/comment/" + comment.uuid}>
                    <strong>
                      {comment.message} by {comment.name}
                    </strong>
                  </a>
                </CommentPost>
              );
            })}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>


    )
  }
}

export default CommentSection;