import React, {Component} from "react";
import {Card, Container, ListGroup, ListGroupItem} from "mdbreact";

class NewsBody extends Component {
    render(){
        return(
            <Container>
                <Card>
                    <ListGroup>
                        <ListGroupItem> New Articles will go here</ListGroupItem>
                    </ListGroup>
                    </Card>
                </Container>
        )
    }
}

export default NewsBody;