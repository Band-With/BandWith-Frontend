import axios from "axios";

const API_URL = "http://localhost:8080/bands/";
// const API_URL = 'http://3.133.139.224:8080/bands/';

class BandService {
  createBand(username, band_name, img) {
    return axios.post(API_URL, {
      username: username,
      bandName: band_name,
      img: img,
    });
  }

  getBand(band_name) {
    return axios.get(API_URL + "/" + band_name, {});
  }

  addBandMusic(band_name, music_id) {
    return axios.post(API_URL + band_name + "/bandmusics", {
      bandName: band_name,
      musicId: music_id,
    });
  }

  getBandInfo(band_id) {
    return axios.get(API_URL + band_id);
  }

  getBandInfoByName(bandname) {
    return axios.get(API_URL + bandname);
  }

  inviteMember(band_name, member_id) {
    return axios.post(API_URL + band_name + "/invitation", {
      bandName: band_name,
      memberId: member_id,
    });
  }

  getBandMusicInfo(bandname, bandMusicId) {
    return axios.get(API_URL + bandname + "/bandmusics/" + bandMusicId);
  }

  leaveBand(bandname, username) {
    return axios.post(API_URL + bandname + "/members/" + username);
  }
}

export default new BandService();
