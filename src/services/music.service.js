import axios from 'axios';

const API_URL = 'http://localhost:8080/musics/';

//test
class MusicService {
    musicInsert(title, singer, composer){
        return axios
            .post(API_URL + 'insert', {
                title: title,
                singer: singer,
                composer: composer
            })
            .then(response => {
                return response.data;
            });
    }

    deleteMusic(music){
        return axios
        .post(API_URL + 'delete', {
            title: music.title,
            singer: music.singer,
            composer: music.composer
        })
        .then(response => {
            return response.data;
        });
    }

    seachMusic(title){
        return axios
        .post(API_URL + 'search', {
            title: title,
        })
        .then(response => {
            return response.data;
        });
    }

}
export default new MusicService();