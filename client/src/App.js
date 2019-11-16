import React, { Component } from "react";
import "./App.css";
import {connect} from 'react-redux'
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import logo from './images/logo.png'
import LoginEmployee from './components/Login-Employee'
import LoginManager from './components/Login-Manager'
import Timesheet from './components/EmployeeTimesheet'
import Timepunch from './components/Timepunch'
import {setLocalUser} from './actions/authUser'
import Unauthorized from './components/Unauthorized'
import Registration from './components/Registration'
import ManagerView from './components/ManagerView'
import ManagerTimeSheet from './components/ManagerTimesheet'
import NoMatch from './components/NoMatch'

class App extends Component {
  componentDidMount(){
    if(localStorage.getItem('token')){
      this.props.dispatch(setLocalUser(localStorage.getItem('token'), this.props.dispatch))
    }
  }
  render() {
    console.log(this.props.authUser)
    return (
      
      
      <Router>
        <div className="container-fluid">
          <div className="masthead text-white text-center">
            <div className="container">
                <Link to="/">
                    <img className="img-responsive center-block mb-5 d-block mx-auto" src={logo} width="250" />
                </Link>

                <hr className="star-light" />
            </div>
          </div>
        <Switch>
        
          <Route exact path="/" component={Home} />
          <Route exact path="/punch" component={this.props.authUser.position >= 2 ? Timepunch : Unauthorized} />
          <Route exact path="/employee/login" component={!this.props.authUser.id ? LoginEmployee : Timesheet} />
          <Route exact path="/manager/login" component={this.props.authUser.position >= 2 ? ManagerView : LoginManager}/>
          <Route exact path='/timesheet' component={this.props.authUser.id ? Timesheet : Home} />
          <Route exact path='/manager/home' component={this.props.authUser.id && this.props.authUser.position < 2 ? LoginManager : ManagerView}/>
          <Route exact path="/manager/enroll" component={this.props.authUser.position >= 2 ? Registration : LoginManager} />
          <Route exact path="/manager/view/timesheet" component={this.props.authUser.id ? ManagerTimeSheet : LoginManager} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <Route component={NoMatch} />
"
        </Switch>
        </div>
      </Router>
    
    );
  }
}

export default connect(store=>({authUser: store.authUser}))(App)
