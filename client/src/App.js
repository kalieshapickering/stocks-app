// Dependencies 
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import Homepage from "../src/pages/Homepage";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import SearchResultPage from "../src/pages/SearchResultPage";

// Components
import NavbarPage from "../src/components/NavbarPage";

const App = () => {
return (
<Router>
  <div>
  <NavbarPage />
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route exact path="/homepage" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/search" component={SearchResultPage} />

    </Switch>
    </div>
  </Router>
)
} 



export default App;
