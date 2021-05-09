import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/members/';

//test
class UserService {
    getMyPageContent(username) {
        return axios.get(API_URL + username);
    }

    getPracticeContent(username, condition){
        return axios.get(API_URL + username + '/records', {
            params: {
                condition: condition
            }
        });
    }

    getBookmarkContent(username, condition){
        return axios.get(API_URL + username + '/bookmarks', {
            params: {
                condition: condition
            }
        });
    }

    getPracticeDetail(username, title, condition){
        return axios.get(API_URL + username + '/records/' + title, {
            params: {
                condition: condition
            }
        });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }

    patchRecordAttribute(username, record_id, access, searchable){
        console.log(access)
        return axios.patch(API_URL + username + '/records/' + record_id, {
            access: access,
            searchable: searchable
        });
    }

    uploadRecord(member_id, music_id, instrument, searchable, visible, file) {  // return comment id
        const obj = {
            member_id:member_id,
            music_id:music_id,
            instrument:instrument,
            searchable:searchable,
            public:visible,
        };
        const json = [JSON.stringify(obj)];

        const data = new FormData();
        data.append('json', json);
        data.append('file', file);

        return axios.post(API_URL + member_id + "/recording", data, {headers: {
            'Content-Type': 'multipart/form-data'
        }}
        );
      }


}
export default new UserService();