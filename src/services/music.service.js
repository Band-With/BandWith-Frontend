import axios from 'axios';

// const API_URL = 'http://localhost:8080/musics';
const API_URL = 'http://15.164.232.137:8080/musics';

//test
class MusicService {
   
    searchMusic(query, filter) {
        return axios.get(API_URL , {
          params: {
            q: query,
            filter: filter,
          },
        });
      }

    searchRecord(music_id){
        return axios
        .get(API_URL+'/'+music_id+'/records', {
        })
    }



}
export default new MusicService();