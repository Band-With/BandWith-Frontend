import axios from 'axios';

const API_URL = 'http://localhost:8080/bands';

//test
class BandService {


    getBand(band_name){
        return axios
        .get(API_URL+'/'+band_name, {
            
        })
    }



}
export default new BandService();
