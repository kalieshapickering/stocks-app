import React, { Component } from "react";
import { Card, CardTitle, CardText } from "mdbreact";

class StockCard extends Component{
    render() {
        return(
            <div>
            <Card>
                <CardTitle>
                    <strong>{props.name}</strong>
                </CardTitle>
                <CardText>
                    {props.price}
                    </CardText>
                    {/* graph of trend for the day */}
            </Card>
                </div>
        )
    }
}
 

export default StockCard;