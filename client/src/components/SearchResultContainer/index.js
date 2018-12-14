import React from "react";
import { Card, Container, ListGroup, ListGroupItem, MDBBtn } from "mdbreact";
import "../NewsBody/NewsBody.css";


const SearchResultContainer = (props) => {
    console.log(props.image);
    return (
        <Container>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <h3> {props.title}</h3>
                        <img alt={props.alt} className="newsImage" src={props.image} />

                        <p>{props.text.slice(0, 450)}...</p>
                        <MDBBtn color="elegant" href={props.url} target="_blank">Read More</MDBBtn>
                        {/* {props.published} */}
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Container>
    )
}

export default SearchResultContainer;