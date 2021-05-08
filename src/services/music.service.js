import axios from 'axios';

const API_URL = 'http://localhost:8080/musics';

//test
class MusicService {
   
    searchMusic(title, filter){
        return axios
        .get(API_URL, {
            params: {
                title: title,
                filter:filter
            }
        })
    }
    searchRecord(music_id){
        return axios
        .get(API_URL+'/'+music_id+'/records', {
            
        })
    }


}
export default new MusicService();