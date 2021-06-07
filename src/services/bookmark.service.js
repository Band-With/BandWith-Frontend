import axios from 'axios';

// const API_URL = 'http://localhost:8080/';
const API_URL = 'http://15.164.232.137:8080/';

class BookmarkService {
    uploadBookmark(username, music_id, title, members, urlList) {  // return comment id
        const obj = {
            username :username,
            musicId: music_id,
            title: title,
            members: members,
            recordUrls: urlList
        };

        return axios.post(API_URL + "members/"+username+ "/bookmarks", obj
        );
    }
}
export default new BookmarkService();