import React, {Component} from "react";
import StockChart from "../../components/StockChart";
import {Card, Col, Row, ListGroup, ListGroupItem, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";
import SearchResultContainer from "../../components/SearchResultContainer";
import CommentSection from "../../components/CommentSection";

class SearchResultPage extends Component{
  


    render(){
    return(
        <div>
            <h1>Stock Name</h1>
            <Card>
<StockChart />
</Card>

<br></br>
<Row>
    <Col md="7">
    {this.props.search&&this.props.search.map(article => {
        return(
  <SearchResultContainer 
    image = {article.main_image}
    title = {article.title}
    text = {article.text}
    url = {article.url}
    published = {article.published}
    />
        )
    })
   
    }
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
<CommentSection/>
    </Card>
</Card>
</Col>
    </Row>
        </div>
    )
}
}
export default SearchResultPage;