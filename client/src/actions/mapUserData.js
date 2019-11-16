import user from '../util/user'

export const MAP_USER_TIMESHEET = 'ADD_USER'

function userTimesheets(user){
    return {
        type: MAP_USER_TIMESHEET,
        user
    }
}

export function handleMapUserTimesheets(id){
    return (dispatch) => {
        return user.getUsers(id)
            .then((user)=>{

                dispatch(userTimesheets(user.data))
            }).catch(()=>{
                alert('Error mapping user timesheets.')
            })
    }
}