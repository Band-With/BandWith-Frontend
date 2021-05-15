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
    uploadBookMark(user_name, music_id, title, members, recordUrls){
        return axios
            .post(API_URL + user_name+'/bookmarks' ,{
                username: user_name,
                musicId: music_id,
                title:title,
                members:members,
                recordUrls:recordUrls
            })   
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

    uploadRecord(username, music_id, instrument, searchable, visible, file) {  // return comment id
        const obj = {
            username:username,
            musicId:music_id,
            instrument:instrument,
            searchable:searchable,
            access:visible,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
            type: 'application/json'
          });
          
        const data = new FormData();
        data.append('file', file);
        data.append('json', blob);

        return axios.post(API_URL + username + "/recording", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
      }


}
export default new UserService();