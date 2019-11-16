import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/authUser'

class Nav extends Component {
    
    handleLogout = () => {
        this.props.dispatch(logoutUser())
    }
    render(){
        return (

            <div className="row">
                <div className="col-12">
                    {this.props.authUser.id ? (
                        <React.Fragment>
                    <h6 className="text-white text-right" >Logged in as: {this.props.authUser.firstName + " " + this.props.authUser.lastName}</h6>
                    <button className="btn btn-light btn-lg float-right" onClick={this.handleLogout}>Logout</button>
                    
                    <Link to="/" className="btn btn-light btn-lg float-left">Home</Link>
                    </React.Fragment> ): null}
                   
                </div>
            </div>
        )
    }
}


export default connect((store)=>({authUser: store.authUser}))(Nav)