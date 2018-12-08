import React, {Component} from "react";
import StockChart from "../../components/StockChart";
import {Card, Col, Row, ListGroup, ListGroupItem, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";

class SearchResultPage extends Component{
    state = {
        search : []
    }

    // componentDidMount() {
    
    //     const client = webhoseio.config({token: 'bd6cde1b-cbe8-4ce2-aa82-73e6ddc91927'});
    //     const query_params = {
    //     "q":  "language:english",
    //     "sort": "crawled"
    //     }
    //     client.query('filterWebContent', query_params)
    //     .then(output => {
    //         console.log(output['posts'][0]['text']); // Print the text of the first post
    //         console.log(output['posts'][0]['published']); // Print the text of the first post publication date
    //     console.log(output['posts']);
    //     this.setState({newsArticles: output['posts']});
    //     }); 
    //     console.log(this.state);
    // }
    

    // };
    render(){
    return(
        <div>
            <h1>Stock Name</h1>
            <Card>
<StockChart />
</Card>
<Row>
    <Col md="7">
    <ListGroup>
       <ListGroupItem>
           Hi
       </ListGroupItem>
    </ListGroup>
    </Col>
<Col md="4">

<Card>
    <Card>
        <ListGroup>
            <ListGroupItem>
                Dummy content
                </ListGroupItem>
        </ListGroup>
    </Card>
    <Card>
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
    </Card>
</Card>
</Col>
    </Row>
        </div>
    )
}
}
export default SearchResultPage;