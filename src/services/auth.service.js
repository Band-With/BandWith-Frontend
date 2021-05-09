import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService{
    sendEmail(email){
        return axios.post(API_URL + 'getCode', {
            mail: email
        })
    }

    checkCode(email, code){
        return axios.post(API_URL + 'checkCode', {
            mail: email,
            code: code,
        })
    }

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
            name: user.name,
            email: user.email,
        })
    }
}

export default new AuthService();