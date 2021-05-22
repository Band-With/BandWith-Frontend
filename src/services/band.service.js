import axios from 'axios';

const API_URL = 'http://localhost:8080/bands/';

class BandService{
    getBandInfo(band_id){
        console.log(band_id)
        return axios.get(API_URL + band_id)
    }
}

export default new BandService();