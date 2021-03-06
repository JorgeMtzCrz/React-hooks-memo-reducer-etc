import axios from 'axios'

//const baseURL = 'http://localhost:3000/header'
//const baseURL = 'https://bestdealtest.herokuapp.com/header'
const baseURL = 'https://bestdealapp.herokuapp.com/header'


const service = axios.create({
    baseURL,
    withCredentials: true
})

export const ALL_URL = baseURL + '/all'

export const ALL_FETCHER = async url => {
    const response = await fetch(url)
    return await response.json()
}

export const CREATE_HEADER = data => service.post('/create', data)
export const UPDATE_HEADER = (id, data) => service.patch(`/update/${id}`, data)
export const UPDATE_HEADER_INFO = (id, data) => service.patch(`/update-info/${id}`, data)

export const DELETE_HEADER = id => service.delete(`/delete/${id}`)