import axios from 'axios';

const API_URL = 'http://localhost:8080/';
// const API_URL = 'http://15.164.232.137:8080/';

//test
class MonthService {
   
    monthlyBand(){
        return axios
        .get(API_URL+'monthlyBand', {
        })
    }

    monthlyMember(){
        return axios
        .get(API_URL+'monthlyMember', {
        })
    }




}
export default new MonthService();