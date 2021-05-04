import axios from "axios";

const API_URL = "http://localhost:8080/";

class SearchService {
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
}

export default new SearchService();
