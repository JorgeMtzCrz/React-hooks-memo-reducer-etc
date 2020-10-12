import axios from 'axios'

//const baseURL = 'http://localhost:3000'
//const baseURL = 'https://bestdealtest.herokuapp.com'
const baseURL = 'https://bestdealapp.herokuapp.com'

const service = axios.create({
    baseURL,
    withCredentials: true
})


export const UPLOAD_PHOTO = photo => service.post('/upload', photo)