import axios from 'axios';

const API_URL = 'http://localhost:8080/bands/';
// const API_URL = 'http://15.164.232.137:8080/bands/';

class BandService {
    createBand(username, bandname, img) {
        return axios.post(API_URL, {
            username: username,
            bandName: bandname,
            img: img,
        })
    }

    getBand(band_name){
        return axios
        .get(API_URL+'/'+band_name, {
            
        })
    }

    addBandMusic(bandname, music_id) {
        return axios.post(API_URL + bandname + "/bandmusics", {
            bandName: bandname,
            musicId: music_id,
        })
    }

    getBandInfo(bandname){
        return axios.get(API_URL + bandname)
    }

    getBandMusicInfo(bandname, bandMusicId){
        return axios.get(API_URL + bandname + "/bandmusics/" + bandMusicId)
    }

    getBandMusicRecords(bandname, bandMusicId){
        return axios.get(API_URL + bandname + "/bandmusics/" + bandMusicId + "/records")
    }

    leaveBand(bandname, username){
        return axios.post(API_URL + bandname + "/members/" + username)
    }
}

export default new BandService();
