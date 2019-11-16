import axios from 'axios';

export  const findById = function(userId, data){
        return axios.get('/api/timesheet/'+userId, data)
    }

export const updateTimesheet = function(timesheetId, data){
        return axios.put('/api/timesheet/'+timesheetId, data)
    }
