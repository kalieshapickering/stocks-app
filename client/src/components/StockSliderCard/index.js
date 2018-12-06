import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "mdbreact";
import StockChart from "../StockChart";

class StockSliderCard extends Component {
    render () {
        return (
            <div className="stockSlider">
    <Container>
        <Row>
            <Col>
            <Card>
                <Col>
<StockChart/>
</Col>
<Col md="4">
            <CardTitle>
                Stock Name
                </CardTitle>
                <CardBody>
                    stock price
                     </CardBody>
                     </Col>
            </Card>
            </Col>
            
            </Row>
        </Container>
            </div>
        )
}
} 

export default StockSliderCard;