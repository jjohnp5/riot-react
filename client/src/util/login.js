import axios from 'axios';


export default  {
    login: function(username, password){
        return axios.post('/login', {username, password}, {headers: {
            'Content-Type': 'application/json'
        }})
    }
}