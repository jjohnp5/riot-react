export const CURRENT_VIEW_USER = 'CURRENT_VIEW_USER'

function viewUser(user){
    return {
        type: CURRENT_VIEW_USER,
        user
    }
}

export function handleViewUser(user){
    return dispatch => {
        dispatch(viewUser(user))
    }
}