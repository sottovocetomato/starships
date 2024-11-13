import api from './api'

const filmsApi = {
  getAll: async (config?: object) => await api.get('/films', config),
  getById: async (url) => await api.get(url, {}),
}

export default filmsApi
