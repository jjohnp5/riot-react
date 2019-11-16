import user from '../util/user'

export const MAP_USERS = 'MAP_USERS'

function managedUsers(users){
    return {
        type: MAP_USERS,
        users
    }
}

export function handleManagedUsers(history){
    return (dispatch) => {
        return user.loadUsers()
            .then((users)=>{

                dispatch(managedUsers(users.data))
                history.push('/manager/home')
            }).catch(()=>{
                alert('Error mapping managed users.')
            })
    }
}