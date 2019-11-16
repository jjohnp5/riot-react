import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class Unauthorized extends Component {

    render(){
        return (
            <React.Fragment>
                <br/>
                <br/>
            <h2 className="text-center">Error 404.</h2>
            <h4 className="text-center" >Resource not found</h4>
            <h4 className="text-center">Click <Link to="/" className="link-basic">here</Link> to go back to home page</h4>
            </React.Fragment>
        )
    }
}

export default connect()(Unauthorized)