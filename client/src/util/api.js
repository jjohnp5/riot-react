import axios from 'axios';

export default  {
    summonerSearch: function(summonerName){
        return axios.get('api/summoner/'+summonerName)
    }
}