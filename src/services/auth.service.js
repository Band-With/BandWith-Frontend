import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8080/auth/';
// const API_URL = 'http://15.164.232.137:8080/auth/';

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

    async login(user){
        const rsa = require('node-bignumber');
        let modulus, exp
        let uid, pwd
        await axios
        .get(API_URL + 'rsa')
        .then(response => {
            if (response.data !== null) {
                console.log(response.data)
                modulus = response.data[0]
                exp = response.data[1]
            }


            //RSA 암호화 생성
            const pub = new rsa.Key()
            pub.setPublic(modulus, exp);
            
            //사용자 계정정보를 암호화 처리
            uid = pub.encrypt(user.username);
            pwd = pub.encrypt(user.password);
        });

        return await axios
            .post(API_URL + 'signin', {
                username: uid,
                pwd: pwd
            })
            .then(response => {
                if (response.data.user !== null) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data
            });
    }
    
    logout(){
        localStorage.removeItem('user');
    }

    async register(user){
        const rsa = require('node-bignumber');
        let modulus, exp
        let uid, pwd
        await axios
        .get(API_URL + 'rsa')
        .then(response => {
            if (response.data !== null) {
                console.log(response.data)
                modulus = response.data[0]
                exp = response.data[1]
            }


            //RSA 암호화 생성
            const pub = new rsa.Key()
            pub.setPublic(modulus, exp);
            
            //사용자 계정정보를 암호화 처리
            uid = pub.encrypt(user.username);
            pwd = pub.encrypt(user.password);
        });

        return await axios.post(API_URL + 'signup', {
            username: uid,
            pwd: pwd,
            name: user.name,
            email: user.email,
        })
    }
}

export default new AuthService();