import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class CommentService {
    getComments(username, recordId, bandMusicId) {
        if (recordId !== 0)
            return axios.get(API_URL + "members/" + username + "/records/" + recordId + "/comments");
        else if (bandMusicId !== 0)
            return axios.get(API_URL + "bandmusics/" + bandMusicId + "/comments")
    }

    createComment(username, bandMusicId, recordId, content) {
        return axios.post(API_URL + "members/" + username + "/comments", {
            bandMusicId: bandMusicId,
            username: username,
            recordId: recordId,
            content: content
        });
    }

    deleteComment(username, commentId){
        return axios.delete(API_URL + "members/" + username + "/comments/" + commentId);
    }

    updateComment(username, commentId, content){
        return axios.patch(API_URL + "members/" + username + "/comments/" + commentId, {
            content: content
        });
    }
}
export default new CommentService();