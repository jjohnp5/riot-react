import React from 'react'
import { Button, Form, FormGroup, Input, Container } from 'reactstrap'
import {connect} from 'react-redux'
import { handleAddUser } from '../actions/authUser';

class Login extends React.Component {
    state = {
      username: '',
      password: ''
    }

    handleInputChange = event => {
      const { name, value } = event.target;
    
        // Set the state for the appropriate input field
        this.setState({
          [name]: value
        });

    }
      handleFormSubmit = event => {
        event.preventDefault();
        
        const {username, password} = this.state
        this.props.dispatch(handleAddUser(username, password, this.props.history))
        
      };
    

  render () {
    return (
      <Container>
          <h3>Login as Manager</h3>
      <Form className="register-employee" >
        <FormGroup>
          <Input
            type='text'
            name='username'
            id='username'
            placeholder="Please enter employee number" 
            onChange={this.handleInputChange}
            />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder="Please enter password"
            onChange={this.handleInputChange}
             />
        </FormGroup>
        
        <Button type="submit" color="success" onClick={this.handleFormSubmit}>
          Submit
        </Button>
      </Form>
      </Container>
    )
  }
}


export default connect(store=>({store: store.authUser}))(Login)