import {
    MAP_USERS

// import {
//     RECEIVE_DATA
} from '../actions/managerMapUsers'


export default function managedUsers(state = [], action){
    switch(action.type){
        case MAP_USERS:
            
            return action.users
        // case RECEIVE_DATA:
        //     return action.todos
        default:        
            return state
    }
}