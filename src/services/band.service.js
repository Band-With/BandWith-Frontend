import axios from 'axios';

const API_URL = 'http://localhost:8080/bands';

//test
class BandService {


    getBand(band_id){
        return axios
        .get(API_URL+'/'+band_id, {
            
        })
    }



}
export default new BandService();
