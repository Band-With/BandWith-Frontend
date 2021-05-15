import axios from 'axios';

const API_URL = 'http://localhost:8080/bands/';

class BandMusicService {
    addBandMusic(bandname, music_id) {
        return axios.post(API_URL + bandname, {
            bandname: bandname,
            musicId: music_id,
        })
    }
}
export default new BandMusicService();