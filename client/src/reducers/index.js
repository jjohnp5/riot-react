import authUser from './authUser'
import userTimesheets from './mapUser'
import managedUsers from './managedUsers'
import viewSheet from './viewSheet'
import viewUser from './viewUser'
import {combineReducers} from 'redux'

export default combineReducers({authUser, userTimesheets, managedUsers, viewSheet, viewUser})
