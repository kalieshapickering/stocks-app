import React from "react";
import {Card, Container, ListGroup, ListGroupItem} from "mdbreact";
// import ArticleResults from "./NewsBodyArticleContainer";

const NewsBody = (props) =>  {
 
        return(
            <Container>
                <Card>
                    <ListGroup>
                        <ListGroupItem> 
                            <h1> {props.title}</h1>
     
    {props.text.slice(0,250)}
    {props.url}
    {props.published}
                        </ListGroupItem>
                    </ListGroup>
                    </Card>
                </Container>
        )
}

export default NewsBody;