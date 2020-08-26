import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sinos.art.br/'
})

export default api