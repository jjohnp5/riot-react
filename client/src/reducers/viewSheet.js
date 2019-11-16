import {
    ADD_SHEET,
    UPDATE_SHEET,
    UPDATE_PUNCH

// import {
//     RECEIVE_DATA
} from '../actions/viewSheet'


export default function viewSheet(state = [], action){
    switch(action.type){
        case ADD_SHEET:
            
            return action.timesheet
        case UPDATE_SHEET:
            console.log(state)
            return state.map((s,i)=>{
                if(i === action.id){
                    s.milesTraveled = action.milesTraveled
                }
                return s
            })

        case UPDATE_PUNCH:
            return state.map((s,i)=>{
                if(s._id === action.id && action.updatePunch === false){
                    console.log('hit')
                    return {...s, punch : s.punch.concat([action.punch])}
                }else if(s._id === action.id){
                    console.log('hit')
                    return {...s, punch : s.punch.map(pun=>{
                        console.log(pun)
                        if(pun._id === action.punch._id){
                            return action.punch
                        }
                        return pun
                    }) }
                    
                }
                return s
            })
        default:        
            return state
    }
}