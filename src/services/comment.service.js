import axios from 'axios';

const API_URL = 'http://localhost:8080/members/';

class CommentService {
    getComments(username, record_id) {
        return axios.get(API_URL + username + "/records/" + record_id + "/comments");
    }
}
export default new CommentService();