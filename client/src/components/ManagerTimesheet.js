import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment'
import {Table, Button, Container} from 'reactstrap'
import AddMile from './AddMile'
import UpdatePunch from './UpdatePunch'

import Nav from './Nav'

class ManagerTimesheet extends React.Component {
    
    componentDidMount(){
        if(!this.props.timesheet.length > 0){
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <Container>
                <Nav />
               
                <h2 className="timesheet-head">{this.props.viewUser.firstName} {this.props.viewUser.lastName}'s Timecard</h2>
                {
                    this.props.user.position >= 2 ? 
                        (<Link to="/manager/home"><Button color="primary">Back</Button></Link>)
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
                                    console.log(moment(pun.format('YYYY-MM-DD')).format())
                                    if(a.length < 2){
                                        return(
                                        <React.Fragment key={i}>
                                        <td><UpdatePunch punch={p} timesheetId={u._id} updatePunch={true}/></td>
                                        <td><UpdatePunch updatePunch={false} newPunch={p} timesheetId={u._id}/></td>
                                        </React.Fragment>)
                                    }
                                    return (
                                     
                                    <td key={i}><UpdatePunch punch={p} timesheetId={u._id} updatePunch={true}/></td>
                                )})}
                                <td>
                                    <AddMile 
                                        milesTraveled={u.milesTraveled}
                                        timesheetId={u._id}
                                        history={this.props.history}
                                        ind={ind}
                                     />
                                </td>
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


export default connect(store=>({timesheet: store.viewSheet, user: store.authUser, viewUser: store.viewUser}))(ManagerTimesheet)