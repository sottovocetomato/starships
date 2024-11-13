import api from './api'

const filmsApi = {
  getAll: async (config?: object) => await api.get('/films', config),
  getById: async (url: string) => await api.get(url, {}),
}

export default filmsApi
