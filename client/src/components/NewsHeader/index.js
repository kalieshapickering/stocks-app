import React, {Component} from "react";
import { Col, Row, Button} from "mdbreact";

class NewsHeader extends Component {
    render(){
        return(
            <div className="jumbotron text-center hoverable p-4">
            <Row>
                <Col>
                <div className="view overlay">
                <img src="https://mdbootstrap.com/img/Photos/Others/laptop-sm.jpg" className="img-fluid" alt="sample"></img>
                
                </div>
                </Col>
                <Col>
                <h4 className="h4 mb-4">This title will come from the API</h4>
                <p className="font-eight-normal">This information will be a short description of the news article pulled from the API.</p>
                <Button href="#">Read More</Button>
                </Col>
            </Row>

            </div>
        )
    }
}

export default NewsHeader;
