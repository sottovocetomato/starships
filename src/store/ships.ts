import { defineStore } from 'pinia'
import type { Ship, DataShip, PreparedShip } from '@/types/ships'
import type { PageMeta } from '@/types/page'
import type { AxiosError, AxiosResponse } from 'axios'
import shipsApi from '@/api/ships'
import filmsApi from '@/api/films'
import peopleApi from '@/api/people'

export const useShipsStore = defineStore({
  id: 'ships',
  state: () => ({
    ships: [] as Ship[],
    currentShip: {} as PreparedShip,
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
    prepareShipsData(data: Ship[]): Ship[] {
      return data?.map((el: Ship) => {
        return {
          ...el,
          id:
            el.url
              .split('/')
              .filter((e: string) => e)
              ?.pop() || -1,
        }
      })
    },
    async prepareShipData(data: PreparedShip) {
      try {
        const filmsArr = data.films
        const peopleArr = data.pilots
        const filmsInfo = []
        const peopleInfo = []
        if (peopleArr.length) {
          for (const link of peopleArr) {
            const preparedLink = link.split('/api')?.[1]

            if (preparedLink) {
              const pilot = (await peopleApi.getById(preparedLink))?.data
              if (!pilot) continue
              peopleInfo.push(pilot.name)
            }
          }
        }
        if (filmsArr.length) {
          for (const link of filmsArr) {
            const preparedLink = link.split('/api')?.[1]

            if (preparedLink) {
              const film = (await filmsApi.getById(preparedLink))?.data
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
    setPageMeta(data: DataShip) {
      this.pageMeta = {
        count: data?.count,
        next: data?.next,
        previous: data?.previous,
      }
      if (typeof data?.next === 'string') {
        this.pageMeta.next = data?.next?.split('/api')?.[1]
      }
      if (typeof data?.previous === 'string') {
        this.pageMeta.previous = data?.previous?.split('/api')?.[1]
      }
    },
    async loadAllShips(config: object) {
      try {
        this.loading = true
        const { data }: AxiosResponse = await shipsApi.getAll(config)
        this.setPageMeta(data)
        if ('results' in data && data.results.length) {
          this.ships = this.prepareShipsData(data.results)
        }

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

        const { data }: AxiosResponse = await shipsApi.getByPageLink(url)
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
        const { data }: AxiosResponse = await shipsApi.getById(id, config)
        await this.prepareShipData(data)
        this.currentShip = data
        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },

    async loadFilteredShip(query: string) {
      try {
        this.loading = true
        this.ships = []
        const { data }: AxiosResponse = await shipsApi.getAllFiltered({ params: { search: query } })
        this.setPageMeta(data)
        this.ships = this.prepareShipsData(data)
        this.loading = false
      } catch (err) {
        console.error((err as AxiosError).message)
      }
    },
  },
})
