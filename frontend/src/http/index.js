import axios from 'axios'
export const API_URL = 'https://hackaton-yakse.ru/api'
const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

export default api
