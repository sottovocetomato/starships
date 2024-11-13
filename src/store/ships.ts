import { defineStore } from 'pinia'
import type { Ship } from '@/types/ships'
import type { PageMeta } from '@/types/PageMeta'
import { AxiosError } from 'axios'
import shipsApi from '@/api/ships'
import filmsApi from '@/api/films'
import peopleApi from '@/api/people'

export const useShipsStore = defineStore({
  id: 'ships',
  state: () => ({
    ships: [] as Ship[],
    currentShip: {} as Ship,
    loading: false as boolean,
    pageMeta: {} as PageMeta,
  }),
  getters: {
    getAllShips: (state) => state.ships,
    getСurrentShip: (state) => state.currentShip,
    getPageMeta: (state) => state.pageMeta,
    isLoading: (state) => state.loading,
  },
  actions: {
    prepareShipsData(data) {
      return data?.results?.map((el) => {
        return {
          ...el,
          id: el.url
            .split('/')
            .filter((e) => e)
            ?.pop(),
        }
      })
    },
    async prepareShipData(data) {
      try {
        const filmsArr = data.films
        const peopleArr = data.pilots
        let filmsInfo = []
        let peopleInfo = []
        if (peopleArr.length) {
          for (const link of peopleArr) {
            const preparedLink = link.split('/api')?.[1]

            if (preparedLink) {
              let pilot = (await peopleApi.getById(preparedLink))?.data
              if (!pilot) continue
              peopleInfo.push(pilot.name)
            }
          }
        }
        if (filmsArr.length) {
          for (const link of filmsArr) {
            const preparedLink = link.split('/api')?.[1]

            if (preparedLink) {
              let film = (await filmsApi.getById(preparedLink))?.data
              if (!film) continue
              filmsInfo.push(film.title)
            }
          }
        }
        data.films_info = filmsInfo
        data.pilots_info = peopleInfo
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
    setPageMeta(data) {
      this.pageMeta = {
        count: data.count,
        next: data?.next?.split('/api')?.[1],
        previous: data?.previous?.split('/api')?.[1],
      }
    },
    async loadAllShips(config: object) {
      try {
        this.loading = true
        const { data }: Ship[] = await shipsApi.getAll(config)
        this.setPageMeta(data)
        this.ships = this.prepareShipsData(data)

        this.loading = false
      } catch (err) {
        this.ships = []
        this.loading = false
        throw new Error((err as AxiosError).message)
      }
    },
    async loadAllByPage(url: string) {
      try {
        this.ships = []
        this.loading = true

        const { data }: Ship[] = await shipsApi.getByPageLink(url)
        this.setPageMeta(data)
        this.ships = this.prepareShipsData(data)

        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
    async loadShipById(id: string | number, config?: object) {
      try {
        this.loading = true
        const { data }: Ship = await shipsApi.getById(id, config)
        await this.prepareShipData(data)
        this.currentShip = data
        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },

    async loadFilteredShip(query) {
      try {
        this.loading = true
        this.ships = []
        const { data }: Ship = await shipsApi.getAllFiltered({ params: { search: query } })
        this.setPageMeta(data)
        this.ships = this.prepareShipsData(data)
        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
  },
})
