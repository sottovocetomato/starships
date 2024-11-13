import api from './api'

const peopleApi = {
  getAll: async (config?: object) => await api.get('/people', config),
  getById: async (url: string) => await api.get(url, {}),
}

export default peopleApi
