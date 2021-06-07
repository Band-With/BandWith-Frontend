import axios from "axios";

// const API_URL = 'http://localhost:8080/bands/';
const API_URL = 'http://15.164.232.137:8080/bands/';

class BandService {
  createBand(username, band_name, img) {
    return axios.post(API_URL, {
      username: username,
      bandName: band_name,
      img: img,
    });
  }


  async addBandMusic(band_name, music_id) {
    return await axios.post(API_URL + band_name + "/bandmusics", {
      bandName: band_name,
      musicId: music_id,
    });
  }
  
  completeBandMusic(bandName, bandMusicId){
    return axios.post(API_URL + bandName + "/bandmusics/" + bandMusicId)
  }
  
  getBandMusicInfo(bandname, bandMusicId){
    return axios.get(API_URL + bandname + "/bandmusics/" + bandMusicId)
  }

  deleteBandMusicRecord(bandName, bandMusicId, recordId){
    return axios.delete(API_URL + bandName + "/bandmusics/" + bandMusicId + "/records/" + recordId)
  }

  getBand(band_id){
      return axios
      .get(API_URL+'/'+band_id, {
          
      })
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

  getBandMusicRecords(bandname, bandMusicId){
    return axios.get(API_URL + bandname + "/bandmusics/" + bandMusicId + "/records")
  }

  leaveBand(bandname, username){
    return axios.post(API_URL + bandname + "/members/" + username)
  }

  addRecord(bandMusicId, recordId, bandname){
    return axios.post(API_URL + bandname + "/bandmusics/" + bandMusicId + "/records", {
      recordId: recordId
    })
  }
}

export default new BandService();
