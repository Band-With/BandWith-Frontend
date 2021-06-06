import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class BookmarkService {
   
    uploadBookmark(username, music_id, title, members, fileList) {  // return comment id
        const obj = {
            username:username,
            music_id:music_id,
            title:title,
            members:members,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        
        const data = new FormData();
        console.log("fileList "+fileList);
        console.log("fileList[0] "+fileList[0]);

        for (let i = 0; i < fileList.length; i++) {
            data.append("fileList", fileList[i]);
        }
  
        data.append('json', blob);
        console.log("data~~ "+data);
        return axios.post(API_URL + "members/"+username+ "/bookmarks", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }



}
export default new BookmarkService();