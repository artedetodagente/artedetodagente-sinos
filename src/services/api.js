import axios from 'axios'

const api = axios.create({
    baseURL: 'https://admin.sinos.art.br'
})

export default api