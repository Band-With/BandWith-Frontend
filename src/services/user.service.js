import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

//test
class UserService {
    getMyPageContent(user) {
        return axios.get(API_URL + 'myPage', {
            params: {
                username: user.username
            }
        });
    }

    getPracticeContent(user){
        return axios.get(API_URL + 'record', {
            params: {
                username: user.username
            }
        });
    }

    getBookmarkContent(user){
        return axios.get(API_URL + 'bookmark', {
            params: {
                username: user.username
            }
        });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }
}
export default new UserService();