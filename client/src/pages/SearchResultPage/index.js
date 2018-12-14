import React, { Component } from "react";
import StockChart from "../../components/StockChart";
import { Card, Col, Row } from "mdbreact";
import SearchResultContainer from "../../components/SearchResultContainer";
// import CommentSection from "../../components/CommentSection";

class SearchResultPage extends Component {
    render() {
        return (
            <div>
                <br></br>
                <h1>Stock Predictor</h1>
                <Card>
                    <StockChart />
                </Card>

                <br></br>
                <Row>
                    <Col>
                        {this.props.search && this.props.search.map(article => {
                            return (
                                <SearchResultContainer
                                    image={article.thread.main_image}
                                    title={article.title}
                                    text={article.text}
                                    url={article.url}
                                    published={article.published}
                                    alt ={article.entities.organizations.name}
                                />
                            )
                        })

                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SearchResultPage;