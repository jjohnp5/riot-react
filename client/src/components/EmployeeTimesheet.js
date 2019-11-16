import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment'
import {Table, Button, Container} from 'reactstrap'

import Nav from './Nav'

class Timesheet extends React.Component {
    componentDidMount(){
        if(!this.props.timesheet.length > 0){
            this.props.history.push('/')
        } 
    }

    render(){
        return(
            <Container>
                <Nav />
                <h2 className="timesheet-head">{this.props.user.firstName} {this.props.user.lastName}'s Timecard</h2>
                {
                    this.props.user.position >= 2 ? 
                        (<Link to="/manager/home"><Button color="primary">View Employee Timesheets</Button></Link>)
                        :
                        null

                    
                }
            <Table striped>
            <thead>
                <tr>
                <th>Date</th>
                <th>In</th>
                <th>Out</th>
                <th>Miles</th>
                </tr>
            </thead>
            <tbody>
                {this.props.timesheet.map((u,ind)=>{
                    const date = moment(u.addedDate)
                    return (
                        <tr key={u._id}>
                       
                                <th scope="row">{date.format('YYYY-MMM-DD')}</th>
                                {u.punch.map((p,i,a)=>{
                                    const pun = moment(p.addedDate)
                                    if(a.length < 2){
                                        return(
                                        <React.Fragment key={i}>
                                        <td>{pun.format('LT')}</td>
                                        <td></td>
                                        </React.Fragment>)
                                    }
                                    return (
                                     
                                    <td key={i}>{pun.format('LT')}</td>
                                )})}
                                
                                    <td>{u.milesTraveled}</td>
                                
                            </tr>
                    )
                })
            }
                </tbody>
                        </Table>
                        </Container>

        )
    }



}


export default connect(store=>({timesheet: store.userTimesheets, user: store.authUser}))(Timesheet)