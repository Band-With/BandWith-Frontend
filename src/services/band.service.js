import axios from 'axios';

const API_URL = 'http://localhost:8080/bands/';

class BandService {
    createBand(username, bandname, img) {
        return axios.post(API_URL, {
            username: username,
            bandName: bandname,
            img: img,
        })
    }

    addBandMusic(bandname, music_id) {
        return axios.post(API_URL + bandname + "/bandmusics", {
            bandName: bandname,
            musicId: music_id,
        })
    }
}
export default new BandService();