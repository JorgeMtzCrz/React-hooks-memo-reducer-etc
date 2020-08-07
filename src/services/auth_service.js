import axios from 'axios';

const baseURL = 'http://localhost:3000/auth'


const service = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
    SIGNUP: data => service.post('/signup', data),
    LOGIN: data => service.post('/login', data),
    CURRENT_USER: () => service.get('/logged'),
    LOGOUT: () => service.get('/logout')
};

export default AUTH_SERVICE;