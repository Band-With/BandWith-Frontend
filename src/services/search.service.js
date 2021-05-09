import axios from "axios";

const API_URL = "http://localhost:8080/";

class SearchService {
  getMusic(music_id) {
    return axios.get(API_URL + "musics/" + music_id);
  }

  getMusics(query, filter) {
    if (query == null)
      query = '';
    return axios.get(API_URL + "musics", {
      params: {
        q: query,
        filter: filter,
      },
    });
  }

  getRecords(music_id, filter) {
    return axios.get(API_URL + "musics/" + music_id + "/records", {
      params: {
        filter: filter,
      },
    });
  }

  getComments(record_id) {
    return axios.get(API_URL + "records/" + record_id + "/comments");
  }

  addComment(record_id, username, text) {  // return comment id
    return axios.post(API_URL + "records/" + record_id + "/comments", {
      username: username,
      text: text,
    });
  }
}

export default new SearchService();
