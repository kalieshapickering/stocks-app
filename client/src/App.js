// Dependencies 
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import webhoseio from "webhoseio";

// Pages
import Homepage from "../src/pages/Homepage";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import SearchResultPage from "../src/pages/SearchResultPage";

// Components
import NavbarPage from "../src/components/NavbarPage";

class App extends Component {
  state = {
    search: "",
    searchResult : []
  }
  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSearch = (event) => {
    event.preventDefault();
      console.log(this.state.search);
      const query_params = {
        "q": this.state.search + " language:english",
        "sort": "relevancy"
        }
      this.handlequery(query_params);
    }
handlequery = query_params => {
  const client = webhoseio.config({token: 'bd6cde1b-cbe8-4ce2-aa82-73e6ddc91927'});
  client.query('filterWebContent', query_params)
  .then(output => {
      console.log(output['posts'][0]['text']); // Print the text of the first post
      console.log(output['posts'][0]['published']); // Print the text of the first post publication date
  console.log(output['posts']);
  this.setState({searchResult: output['posts']});
  }); 
}
  componentDidMount() {

    const query_params = {
    "q": "language:english",
    "sort": "crawled"
    }
    console.log(this.state);
    this.handlequery(query_params);
  }
  render(){
return (
<Router>
  <div>
  <NavbarPage handleSearch = {this.handleSearch} handleInputChange = {this.handleInputChange} search = {this.state.search} />
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route exact path="/homepage" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/search" render={(props)=> <SearchResultPage search = {this.state.searchResult}/>} />

    </Switch>
    </div>
  </Router>
)
} 
}



export default App;
