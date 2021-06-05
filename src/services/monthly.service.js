import axios from 'axios';

const API_URL = 'http://localhost:8080/';
// const API_URL = 'http://15.164.232.137:8080/';

//test
class MonthService {
   
    monthlyMember(){
        return axios
        .get(API_URL+'monthly-member', {
        })
    }



}
export default new MonthService();