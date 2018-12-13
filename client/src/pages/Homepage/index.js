import React, {Component} from "react";
// import StockSlider from "../../components/StockSlider";
import NewsHeader from "../../components/NewsHeader";
import NewsBody from "../../components/NewsBody";
import webhoseio from "webhoseio";
// import ArticleResults from "../../components/NewsBody/NewsBodyArticleContainer";


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
            console.log(output['posts'][0]['thread']['main_image'])
        console.log(output['posts']);
        
        this.setState({newsArticles: output['posts']});
        console.log(this.state);
        console.log(this.state.newsArticles["thread"]["main_image"]);
        {output['post'].map(
            console.log(["thread"]["main_image"])
        )}
        }); 
    
    }


    render(){
        return(
            <div>
    {/* <StockSlider /> */}
    <NewsHeader />
    <br></br>

    
      {this.state.newsArticles.map(article => {
return(
    <NewsBody
    image ={article.thread.main_image}
    title ={article.title}
    text ={article.text}
    url ={article.url}
    published ={article.published}
    alt ={article.entities.organizations.name}
    />
)
      }
      )
    }
            </div>
        )
    }

}

export default Homepage;