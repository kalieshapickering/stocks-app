import React from "react";
import {Card, Container, ListGroup, ListGroupItem, MDBBtn} from "mdbreact";
// import ArticleResults from "./NewsBodyArticleContainer";
import "./NewsBody.css";

const NewsBody = (props) =>  {
 
        return(
            <Container>
                <Card>
                    <ListGroup>
                        <ListGroupItem> 
                            <h3> {props.title}</h3>
     <img alt={props.alt} className="newsImage" src={props.image}/>
    <p>{props.text.slice(0,600)}...</p>
    <MDBBtn color="elegant" href={props.url}>Read More</MDBBtn> 
    {/* {props.published} */}
                        </ListGroupItem>
                    </ListGroup>
                    </Card>
                </Container>
        )
}

export default NewsBody;