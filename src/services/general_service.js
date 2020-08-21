import axios from 'axios'

const baseURL = 'http://localhost:3000'

const service = axios.create({
    baseURL,
    withCredentials: true
})


export const UPLOAD_PHOTO = photo => service.post('/upload', photo)