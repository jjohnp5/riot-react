import React, { Component } from "react";
import "./App.css";
import {connect} from 'react-redux'
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends Component {
  render() {
   
    return (
      
      
      <Router>
        
        <Switch>
        
          <Route exact path="/" component={Home} />

        </Switch>
      </Router>
    
    );
  }
}

export default connect()(App);
