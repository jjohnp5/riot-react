
import user from '../util/login'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import {handleMapUserTimesheets} from './mapUserData'
export const AUTH_USER = 'AUTH_USER'
export const LOGOUT_USER = 'LOGOUT_USER'


function addUser(user){
    return {
        type: AUTH_USER,
        user
    }
}
 function removeUser(user){
    return {
        type: LOGOUT_USER,
        user
    }
}
export function handleLogoutUser(i){
    return (dispatch)=>{
        dispatch(removeUser(i))
        return user.logout()
            .catch(()=>{
                dispatch(addUser(i))
                alert('an error occured');
            })
    }
    
}
export function handleAddUser(username, password, history){
    return (dispatch) => {
        return user.login(username, password)
            .then((token)=>{

                axios.defaults.headers.common.Authorization = `Bearer ${token.data.token}`;

                const decoded = jwt_decode(token.data.token)
                localStorage.setItem('token', token.data.token)
                dispatch(addUser(decoded))
                dispatch(handleMapUserTimesheets(decoded.employeeNum))

                history.push('/timesheet')
            }).catch((err)=>{
                alert('Error connecting to DB')
                history.push('/unauthorized')
            })
    }
}
export const logoutUser = () => dispatch => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization;
    dispatch(removeUser({}));
    window.location = '/'
}
export const setLocalUser = (token) => {
    return(dispatch)=>{
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const decoded = jwt_decode(token)
        dispatch(addUser(decoded))
        dispatch(handleMapUserTimesheets(decoded.employeeNum))
    }
}