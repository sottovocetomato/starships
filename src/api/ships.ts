import api from './api'

const shipsApi = {
  getAll: async (config?: object) => await api.get('/starships', config),
  getAllFiltered: async (config?: object) => await api.get('/starships', config),
  getByPageLink: async (url) => await api.get(url, {}),
  getById: async (id: number | string, config?: object) =>
    await api.get(`/starships/${id}`, config),
}

export default shipsApi
