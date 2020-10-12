import axios from 'axios'

//const baseURL = 'http://localhost:3000/product'
//const baseURL = 'https://bestdealtest.herokuapp.com/product'
const baseURL = 'https://bestdealapp.herokuapp.com/product'


const service = axios.create({
    baseURL,
    withCredentials: true
})

export const ALL_URL = baseURL + '/all'

export const ALL_FETCHER = async url => {
    const response = await fetch(url)
    return await response.json()
}
export const SEARCH_PRODUCT = searchTerm => service.get(`/search?title=${searchTerm}`)

export const CREATE_PRODUCT = data => service.post('/create', data)
export const UPDATE_PRODUCT = (id, data) => service.patch(`/update/${id}`, data)
export const UPDATE_PRODUCT_INFO = (id, data) => service.patch(`/update-info/${id}`, data)

export const DELETE_PRODUCT = id => service.delete(`/delete/${id}`)