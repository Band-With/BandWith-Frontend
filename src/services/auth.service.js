import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService{
    login(user){
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                pwd: user.password
            })
            .then(response => {
                if (response.data.user !== null) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data;
            });
    }
    
    logout(){
        localStorage.removeItem('user');
    }

    register(user){
        return axios.post(API_URL + 'signup', {
            username: user.username,
            pwd: user.password,
            name: user.name
        })
    }
}

export default new AuthService();