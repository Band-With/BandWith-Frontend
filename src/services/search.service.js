import axios from "axios";

// const API_URL = "http://localhost:8080/";
const API_URL = 'http://15.164.232.137:8080/';

class SearchService {
  getMusic(music_id) {
    return axios.get(API_URL + "musics/" + music_id);
  }

  getRecords(music_id, filter) {
    return axios.get(API_URL + "musics/" + music_id + "/records", {
      params: {
        filter: filter,
      },
    });
  }

  getMusics(query, filter) {
    if (query == null) query = "";
    return axios.get(API_URL + "musics", {
      params: {
        q: query,
        filter: filter,
      },
    });
  }

  getBandMusics(query, subject, filter) {
    return axios.get(API_URL + "bandmusics", {
      params: {
        title: query,
        subject: subject,
        filter: filter,
      },
    });
  }

  searchForInvite(member_id) {
    if (member_id == null) member_id = "";
    return axios.get(API_URL + "members", {
      params: {
        member_id: member_id,
      },
    });
  }

  invite(member_id, band_id) {
    axios.post(API_URL + "invitation", {
      band_id: band_id,
      member_id: member_id
    });
  }

  getComments(record_id) {
    return axios.get(API_URL + "records/" + record_id + "/comments");
  }

  addComment(record_id, username, text) {
    // return comment id
    return axios.post(API_URL + "records/" + record_id + "/comments", {
      username: username,
      text: text,
    });
  }
}

export default new SearchService();
