import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

//test
class UserService {
    getMyPageContent(username) {
        return axios.get(API_URL + 'myPage', {
            params: {
                username: username
            }
        });
    }

    getPracticeContent(username, condition){
        return axios.get(API_URL + 'record', {
            params: {
                username: username,
                condition: condition
            }
        });
    }

    getBookmarkContent(username, condition){
        return axios.get(API_URL + 'bookmark', {
            params: {
                username: username,
                condition: condition
            }
        });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }
}
export default new UserService();