import { defineStore } from 'pinia'
import type { Ship } from '@/types/ships'
import { AxiosError } from 'axios'
import shipsApi from '@/api/ships'

export const useShipsStore = defineStore({
  id: 'ships',
  state: () => ({
    ships: [] as Ship[],
    currentShip: {} as Ship,
    loading: false as boolean,
  }),
  getters: {
    getAllShips: (state) => state.ships,
    getСurrentShip: (state) => state.currentShip,
    isLoading: (state) => state.loading,
  },
  actions: {
    async loadAllShips(config: object) {
      try {
        this.loading = true
        const { data }: Ship[] = await shipsApi.getAll(config)
        this.ships = data?.results?.map((el) => {
          return {
            ...el,
            id: el.url
              .split('/')
              .filter((e) => e)
              ?.pop(),
          }
        })
        this.loading = false
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

    async loadFilteredShip(query) {
      try {
        this.loading = true
        this.ships = []
        const { data }: Ship = await shipsApi.getAllFiltered({ params: { search: query } })
        this.ships = data?.results?.map((el) => {
          return {
            ...el,
            id: el.url
              .split('/')
              .filter((e) => e)
              ?.pop(),
          }
        })
        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
  },
})
