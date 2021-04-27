import axios from 'axios';

const API_URL = 'http://localhost:8080/members/1/records/';

//test
class S3Service {
    getFile(id) {
        return axios.get(API_URL + id);
    }
}
export default new S3Service();