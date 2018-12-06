import React, {Component} from "react";
import NavbarPage from "../../components/NavbarPage";
import StockSlider from "../../components/StockSlider";
import NewsHeader from "../../components/NewsHeader";
import NewsBody from "../../components/NewsBody";
import webhoseio from "webhoseio";

class Homepage extends Component {

    state = {
        newsArticles : []
    }

    componentDidMount() {

        const client = webhoseio.config({token: 'bd6cde1b-cbe8-4ce2-aa82-73e6ddc91927'});
        const query_params = {
        "q": "stock market language:english",
        "sort": "crawled"
        }
        client.query('filterWebContent', query_params)
        .then(output => {
            console.log(output['posts'][0]['text']); // Print the text of the first post
            console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        console.log(output['posts']);
        }); 
    }


    render(){
        return(
            <div>
    <NavbarPage />
    <StockSlider />
    <NewsHeader />
    <br></br>
    <NewsBody />
            </div>
        )
    }

}

export default Homepage;