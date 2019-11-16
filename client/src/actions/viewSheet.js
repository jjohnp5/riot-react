

export const ADD_SHEET = 'ADD_SHEET';
export const UPDATE_SHEET = 'UPDATE_SHEET'
export const UPDATE_PUNCH = 'UPDATE_PUNCH'

function addUserSheets(timesheet){
    return {
        type: ADD_SHEET,
        timesheet
    }
}
function updateUserSheets(updateData){
    return {
        type: UPDATE_SHEET,
        updateData
    }
}
function updatePunch(updateData){
    return {
        type: UPDATE_PUNCH,
        ...updateData
    }
}

export function handleViewTimesheet(sheet){
    return (dispatch) => {
        dispatch(addUserSheets(sheet))
    }
}
export function handleUpdateSheet(sheet){
    return (dispatch)=>{
        dispatch(updateUserSheets(sheet))
    }
}

export function handleUpdatePunch(punch){
    return (dispatch)=>{
        dispatch(updatePunch(punch))
    }
}