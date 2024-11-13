import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'

const options = {
  baseURL: 'https://swapi.dev/api',
  headers: {
    Accept: 'application/json',
  },
} as CreateAxiosDefaults

const AxiosInstance = axios.create(options)

const api = (axios) => ({
  get: (url, config?: {}) => axios.get(url, config),
  post: (url, body: {}, config?: {}) => axios.post(url, body, config),
  patch: (url, body: {}, config?: {}) => axios.patch(url, body, config),
  delete: (url, config?: {}) => axios.delete(url, config),
})

export default api(AxiosInstance)
