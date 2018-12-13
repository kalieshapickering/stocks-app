import React, {Component} from "react";
import {MDBRow, MDBCol, MDBMask, MDBView} from "mdbreact";
import "./NewsHeader.css";

class NewsHeader extends Component {
    render(){
        return(
            <div className="jumbotron text-center hoverable p-4">
            <MDBRow className="mt-4">
          <MDBCol md="12">
            <MDBView hover zoom>
              <img
                src="http://whatsupnewp.com/wp-content/uploads/2016/06/maxresdefault.jpg"
                className="img-fluid homepageImg"
                alt=""
              />
              <MDBMask className="flex-center">
              </MDBMask>
            </MDBView>
          </MDBCol>
          </MDBRow>
   
            </div>
        )
    }
}

export default NewsHeader;
