import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = 'http://localhost:8080/members/';
const API_URL = 'http://15.164.232.137:8080/members/';

class UserService {
  // 아이디로 유저 정보 가져오기
  getMember(username) {
    return axios.get("http://localhost:8080/member/" + username);
  }

  // 아이디로 사용자 검색
  getMembers(username) {
    return axios.get("http://localhost:8080/members", {
      params: {
        q: username,
      },
    });
  }

  // 프로필 수정
  updateMemberProfile(memberId, name, profileImg) {
    return axios.patch(API_URL + memberId, {
      memberId: memberId,
      name: name,
      profileImg: profileImg,
    });
  }

  // 비밀번호 수정
  async updateMemberPw(memberId, changedPw) {
    const rsa = require('node-bignumber')
    let modulus, exp, pwd
    await axios
    .get('http://localhost:8080/auth/rsa')
    .then(response => {
      if (response.data !== null) {
        console.log(response.data)
        modulus = response.data[0]
        exp = response.data[1]
      }

      //RSA 암호화 생성
      const pub = new rsa.Key();
      pub.setPublic(modulus, exp);
      
      //사용자 계정정보를 암호화 처리
      pwd = pub.encrypt(changedPw);
    });
    console.log(pwd);
    return axios.patch(API_URL + memberId +"/pw", {
      memberId: memberId,
      pwd: pwd,
    });
  }

  getMyPageContent(username) {
    return axios.get(API_URL + username);
  }

  getPracticeContent(username, condition) {
    return axios.get(API_URL + username + "/records", {
      params: {
        condition: condition,
      },
    });
  }
  uploadBookMark(user_name, music_id, title, members, recordUrls) {
    return axios.post(API_URL + user_name + "/bookmarks", {
      username: user_name,
      musicId: music_id,
      title: title,
      members: members,
      recordUrls: recordUrls,
    });
  }

  getBookmarkContent(username, condition) {
    return axios.get(API_URL + username + "/bookmarks", {
      params: {
        condition: condition,
      },
    });
  }

  getPracticeDetail(username, musicId, condition) {
    return axios.get(API_URL + username + "/records/" + musicId, {
      params: {
        condition: condition,
      },
    });
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
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
        console.log(blob);
        return axios.post(API_URL + username + "/recording", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }
  patchRecordAttribute(username, record_id, access, searchable) {
    console.log(access);
    return axios.patch(API_URL + username + "/records/" + record_id, {
      access: access,
      searchable: searchable,
    });
  }


  follow(user_name, followingId) {
    return axios.post(API_URL + user_name + "/follows", {
      followingId: followingId,
    });
  }

  unfollow(user_name, followingId) {
    return axios.delete(API_URL + user_name + "/follows", {
      data: {
        followingId: followingId,
      },
    });
  }
}
export default new UserService();
