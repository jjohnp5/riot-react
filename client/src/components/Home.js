import React from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Nav from './Nav'
import profilepic from "../images/profilepic.png";
import timesheet from "../images/timesheet.png";
import manager from '../images/manager.png'



class Home extends React.Component {
    componentDidMount(){
        this.props.history.push('/');
    }


    render() {
        return (
            
                <div className="row d-flex justify-content-center text-center text-white">
                    <div className="col-12">
                    <Nav />
                        <div className="row d-flex justify-content-center text-center text-white">

                            <div className="col-12 mt-2 text-white">
                            <h5 className="icon-label"> Punch 
                                <Link to="/punch">
                                    
                                    <img alt="punch" className="img-responsive center-block mb-5 d-block mx-auto" src={profilepic} width="100" />
                                </Link>
                                </h5>

                            </div>
                        </div>
                            <div className="row d-flex justify-content-center text-center text-white">

                                <div className="col-md-4 mt-2 text-white">
                                <h5 className="icon-label"> {this.props.user.id ? "My Timesheet" : "Employee Login" }
                                    <Link to="/employee/login">
                                        
                                        <img alt="employee login" className="img-responsive center-block mb-5 d-block mx-auto" src={timesheet} width="100" />
                                    </Link>
                                    </h5>

                                </div>

                                    <div className="col-md-4 mt-2 text-lg">
                                    <h5 className="icon-label">{this.props.user.position >= 2 ? "Manager Portal" : "Manager Login" }
                                        <Link to="/manager/login">
                                            
                                            <img alt="manager login" className="img-responsive center-block mb-5 d-block mx-auto" src={manager} width="100" />
                                        </Link>
                                        </h5>
                                    </div>
                            </div>
                    </div>


                </div>
                        )
                    }
                
                
                
                }
                
                
export default connect((store)=>({user:store.authUser}))(Home)