import {
    CURRENT_VIEW_USER
} from '../actions/viewUser'

export default function viewUser(state = {}, action){
    switch(action.type){
        case CURRENT_VIEW_USER:
            return action.user
        default:
            return state;
    }
}