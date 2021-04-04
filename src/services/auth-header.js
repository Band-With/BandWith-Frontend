export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(iser && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}