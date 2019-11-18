import React from "react";
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';



class Home extends React.Component {
    componentDidMount(){
        this.props.history.push('/');
    }
    state = {
        summonerName: '',
        summonerData: {},
        summonerMatches: []
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
          axios.get('api/summoner/'+this.state.summonerName, {
            headers: {"Content-Type" : "application/json"}
        })
            .then(data => {
                this.setState({summonerData: data.data})
                axios.get('api/matches/'+data.data.accountId)
                .then(dd=> {
                    this.setState({summonerMatches : dd.data})
                })
            })
          
          
        };


    render() {
        return (
            
                <Container>
                    <FormGroup>
                    <Form className="summoner-search-box col-md-4 offset-4">
                    <Input
                        type='text'
                        name='summonerName'
                        id='summoner'
                        placeholder="Please enter summoner name" 
                        onChange={this.handleInputChange}
                        />
                        <Button type="submit" color="success" onClick={this.handleFormSubmit} className="offset-4 justify-content-center">
                        Search
                        </Button>
                    </Form>
                    </FormGroup>
                </Container>
                        )
                    }
                
                
                
                }
                
                
export default connect()(Home);