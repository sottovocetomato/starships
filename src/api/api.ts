import axios from 'axios'
import type { CreateAxiosDefaults, AxiosInstance, AxiosRequestConfig } from 'axios'

const options = {
  baseURL: 'https://swapi.dev/api',
  headers: {
    Accept: 'application/json',
  },
} as CreateAxiosDefaults

const AxiosInstance = axios.create(options)

const api = (axios: AxiosInstance) => ({
  get: (url: string, config?: AxiosRequestConfig) => axios.get(url, config),
  post: (url: string, body: unknown, config?: AxiosRequestConfig) => axios.post(url, body, config),
  patch: (url: string, body: unknown, config?: AxiosRequestConfig) =>
    axios.patch(url, body, config),
  delete: (url: string, config?: AxiosRequestConfig) => axios.delete(url, config),
})

export default api(AxiosInstance)
