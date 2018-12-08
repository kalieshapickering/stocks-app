import React from "react";
import {Card, Container, ListGroup, ListGroupItem, MDBBtn} from "mdbreact";
// import ArticleResults from "./NewsBodyArticleContainer";

const NewsBody = (props) =>  {
 
        return(
            <Container>
                <Card>
                    <ListGroup>
                        <ListGroupItem> 
                            <h3> {props.title}</h3>
     <img alt="article image" src={props.main_image}/>
    <p>{props.text.slice(0,450)}...</p>
    <MDBBtn color="info" href={props.url}>Read More</MDBBtn> 
    {props.published}
                        </ListGroupItem>
                    </ListGroup>
                    </Card>
                </Container>
        )
}

export default NewsBody;