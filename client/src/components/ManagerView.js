import React from "react";
import {handleManagedUsers} from '../actions/managerMapUsers'
import {connect} from 'react-redux'
import { Button, FormGroup, Label, Input, Col, Container } from "reactstrap";
import Nav from './Nav'
import {handleViewTimesheet} from '../actions/viewSheet'
import {handleViewUser} from '../actions/viewUser'

class ManagerView extends React.Component {
  
  componentDidMount() {
    //map through array of data
    this.showAllEmployees();
    
  }

  //calling to DB to render employees
  showAllEmployees = () => {
    if(this.props.store.authUser.id){
      return this.props.dispatch(handleManagedUsers(this.props.history))

    }
    this.props.history.push('/')
    
  }
  
  handleEnrollRedirect = () => {
    this.props.history.push("/manager/enroll"); //register route
  };

  handleChange = e => {
    const {firstName, lastName, employeeNum}=this.props.store.managedUsers[e.target.value]
    //only taking in employeeNum, changed state to just employeeNum in order findbyID
    if(e.target.value){
      this.props.dispatch(handleViewTimesheet(this.props.store.managedUsers[e.target.value].timesheets))
      this.props.dispatch(handleViewUser({firstName, lastName, employeeNum}))
    }
  };

  //
  handleTimeCardSelectionSubmit = event => {
    event.preventDefault();
    
    this.props.history.push(`/manager/view/timesheet`);
  };

  render() {
    
    // let list = this.state.employees;
    return (
      <Container>
        <Nav/>
        <br/>
        <br/>
        {/* direct to enroll */}
        <Button size="lg" color="info" type="submit" onClick={()=>{this.props.history.push('/manager/enroll')}}>
          Enroll
        </Button>
        


        {/* drop down selection for timecards */}
        <FormGroup>
          <Label for="Select">Select Employee</Label>
          <Input
            type="select"
            name="employeeNum"
            id="exampleSelect"
            defaultValue={null}
            onChange={this.handleChange}
          >
          <option></option>
            {this.props.store.managedUsers.map((selection,i) => 
              (
              
              <option value={i} key={i}>
                Name: {selection.firstName} {selection.lastName}, Employee ID:{
                  selection.employeeNum
                }
              </option>
            ))}
          </Input>
          <br/>
          <Col xs={{size: 4, offset: 4}}>
          <Button  block color="primary" type="submit" onClick={this.handleTimeCardSelectionSubmit}>
            Show Card
          </Button>
          </Col>
        </FormGroup>
      </Container>
    );
  }
}

export default connect((store)=>({store: store}))(ManagerView);
