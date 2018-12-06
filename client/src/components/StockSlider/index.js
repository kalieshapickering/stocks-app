import React, { Component } from "react";
import "./StockSlider.css";
import { Row, Col } from "mdbreact";
import StockSliderCard from "../StockSliderCard";

class StockSlider extends Component {
    render () {
        return (
            <div className="stockSlider">
        <Row>
            <Col>
            <StockSliderCard/>
            </Col>
            <Col>
            <StockSliderCard/>
            </Col>
            <Col>
            <StockSliderCard/>
            </Col>
            </Row>
            </div>
        )
}
} 

export default StockSlider;