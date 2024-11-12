import { defineStore } from 'pinia'
import type { Ship } from '@/types/ships'
import { AxiosError } from 'axios'
import shipsApi from '@/api/ships'

export const useShipsStore = defineStore({
  id: 'ships',
  state: () => ({
    ships: [] as Ship[],
    currentShip: {} as Ship,
  }),
  getters: {
    getAllShips: (state) => state.ships,
    getСurrentShip: (state) => state.currentShip,
  },
  actions: {
    async loadAllShips(config: object) {
      try {
        const { data }: Ship[] = await shipsApi.getAll(config)
        this.ships = data?.results
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
    async loadShipById(id: string | number, config?: object) {
      try {
        const { data }: Ship = await shipsApi.getById(id, config)
        this.currentShip = data?.data
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },

    async loadFilteredUsers(payload: {}, config?: object, infinite: boolean = false) {
      try {
        return await users.getAllFiltered(payload)
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
  },
})
