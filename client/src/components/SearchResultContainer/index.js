import React, {Component} from "react";
import StockChart from "../StockChart";
import webhoseio from "webhoseio";


class SearchResultContainer extends Component {
    state = {
        search : []
    }
    
    componentDidMount() {
    
        const client = webhoseio.config({token: 'bd6cde1b-cbe8-4ce2-aa82-73e6ddc91927'});
        const query_params = {
        "q":  "language:english",
        "sort": "crawled"
        }
        client.query('filterWebContent', query_params)
        .then(output => {
            console.log(output['posts'][0]['text']); // Print the text of the first post
            console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        console.log(output['posts']);
        this.setState({newsArticles: output['posts']});
        }); 
        console.log(this.state);
    }
    
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
    render(){

    return(
        <div>
<StockChart />
        </div>
    )
}
}
export default SearchResultContainer;