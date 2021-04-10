import axios from 'axios';

const API_URL = 'http://localhost:8080/musics/';

class MusicService{

    registerMusic(music){
        return axios.post(API_URL + 'insert', {
            title: music.title,
            singer: music.singer,
            composer: music.composer
        })
    }
}

export default new AuthService();