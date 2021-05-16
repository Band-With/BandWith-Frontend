import axios from 'axios';

const API_URL = 'http://localhost:8080/members/';

class CommentService {
    getComments(username, record_id) {
        return axios.get(API_URL + username + "/records/" + record_id + "/comments");
    }

    createComment(username, bandMusicId, recordId, content) {
        return axios.post(API_URL + username + "/comments", {
            bandMusicId: bandMusicId,
            username: username,
            recordId: recordId,
            content: content
        });
    }

    deleteComment(username, commentId){
        return axios.delete(API_URL + username + "/comments/" + commentId);
    }

    updateComment(username, commentId, content){
        return axios.patch(API_URL + username + "/comments/" + commentId, {
            content: content
        });
    }
}
export default new CommentService();