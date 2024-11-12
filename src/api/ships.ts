import api from './api'

const shipsApi = {
  getAll: async (config?: object) => await api.get('/starships', config),
  getAllFiltered: async (data?: object | [], config?: object) =>
    await api.post('/starships/filter', data, config),
  getById: async (id: number | string, config?: object) =>
    await api.get(`/starships/${id}`, config),
}

export default shipsApi
