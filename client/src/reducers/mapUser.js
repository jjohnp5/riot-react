import {
    MAP_USER_TIMESHEET

// import {
//     RECEIVE_DATA
} from '../actions/mapUserData'


export default function mapUser(state = [], action){
    switch(action.type){
        case MAP_USER_TIMESHEET:
            
            return action.user
        // case RECEIVE_DATA:
        //     return action.todos
        default:        
            return state
    }
}