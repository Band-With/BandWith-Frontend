import axios from 'axios';

const API_URL = 'http://localhost:8080/musics/';

class SearchService{
    getRecords(music_id, filter){
        return axios.get(API_URL + music_id + '/records', {
            params: {
                music_id: music_id,
                filter: filter
            }
        });
    }
}

export default new SearchService();