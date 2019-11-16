import React, { Component} from 'react';
import {connect} from 'react-redux'
import {Button, Input, FormGroup} from 'reactstrap';
import { handleUpdatePunch} from '../actions/viewSheet'
import API from '../util/punch'
import moment from 'moment';


class UpdatePunch extends Component {
    state = {
        updatingPunch: false,
        updatePunch: this.props.updatePunch,
        newPunch: this.props.newPunch,
        punch: this.props.updatePunch ? this.props.punch : {}
    }
    updatingPunch = () => {
        this.setState({
        updatingPunch: !this.state.updatingPunch
        })
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        const time = value.split(':')
        console.log(time);
        if(!this.state.updatePunch){
            this.setState({punch: {
                [name]: moment(this.state.newPunch.addedDate).set('hours', time[0]).set('minutes', time[1]).format(),
                punchType: this.state.newPunch.punchType === "In" ? "Out" : "In"
            }}
            )
        }else{
            this.setState({punch: {...this.state.punch,
                [name]: moment(this.state.punch.addedDate).set('hours', time[0]).set('minutes', time[1]).format()
            }})
        }
        console.log(this.state)
        
    }
    updatePunch = (e) => {
        
        e.preventDefault();
            API.updatePunch(this.props.timesheetId, this.state.punch, this.state.updatePunch)
                .then(p=>{
                    this.setState({updatingPunch: false})
                    this.props.dispatch(handleUpdatePunch({id: this.props.timesheetId, updatePunch: this.state.updatePunch, punch: p.data}))
                }).catch(err=>{
                    console.log(err);
                })
        }
            
    
    render(){
        return (
            <div>
                {this.state.updatingPunch ? 
                <React.Fragment>
                    <FormGroup onKeyUp={(e)=>{if(e.keyCode === 27){this.updatingPunch()}}}>
                    <Input type='time' name="addedDate" 
                        value={this.state.punch ? moment(this.state.punch.addedDate).format('HH:mm'): ""}
                        onChange={this.handleInputChange} autoFocus={true} />
                    
                    
                    <Button color="success" onClick={this.updatePunch}>Update Punch</Button>
                    </FormGroup>
                    </React.Fragment>
                    :
                    <Input onClick={this.updatingPunch} placeholder={this.state.updatePunch ? moment(this.state.punch.addedDate).format('LT'): ""}    />
            }
                
            </div>
        )

    }

    
}

export default connect()(UpdatePunch);