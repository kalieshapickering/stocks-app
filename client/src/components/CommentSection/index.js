import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";

const CommentSection = () => {
    return(
        <div>
            <MDBContainer>
      <MDBRow>
        <MDBCol>
          <form>
            <p className="h5 text-center mb-4">Leave a Comment</p>
            <div className="grey-text">
            <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
                <MDBInput
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil"
              />
            </div>
            <div className="text-center">
              <MDBBtn>Submit</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            </div>
    )
}

export default CommentSection;