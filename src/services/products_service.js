import axios from 'axios'

const baseURL = 'http://localhost:3000/product'

const service = axios.create({
    baseURL,
    withCredentials: true
})

export const ALL_URL = baseURL + '/all'

export const ALL_FETCHER = async url => {
    const response = await fetch(url)
    return await response.json()
}

export const CREATE_PRODUCT = data => service.post('/create', data)

export const DELETE_PRODUCT = id => service.delete(`/delete/${id}`)