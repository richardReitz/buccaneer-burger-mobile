import axios from 'axios'

export const api = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: 'http://192.168.18.100:3333'
})