<template>
  <div class="ships-list-wrap">
    <h1>Starships - лучшая база данных по космическим кораблям!</h1>
    <div class="ships-list container">
      <SearchForm @formSubmit="onSearch" />
      <article aria-busy="true" v-if="shipStore.isLoading"></article>
      <article
        v-else-if="shipStore.getAllShips.length"
        v-for="ship in shipStore.getAllShips"
        class="ship-card"
        :id="ship?.id"
        :key="ship?.name"
        @click="onShipClick"
      >
        <div class="ship-card__column">
          <span> Название </span>
          <p>{{ ship?.name }}</p>
        </div>
        <div class="ship-card__column">
          <span> Модель </span>
          <p>{{ ship?.model }}</p>
        </div>

        <div class="ship-card__column">
          <span> Макс. скорость </span>
          <p>{{ ship?.max_atmosphering_speed }}</p>
        </div>

        <div class="ship-card__column">
          <span> Класс корабля </span>
          <p>{{ ship?.starship_class }}</p>
        </div>

        <div class="ship-card__column">
          <span> Стоимость </span>
          <p>{{ ship?.cost_in_credits }} Кр.</p>
        </div>
      </article>
      <h4 class="no-data" v-else>Данные отсутствуют...</h4>
    </div>
  </div>
  <Pagination
    v-if="!!shipStore.pageMeta.count"
    :pageMeta="shipStore.pageMeta"
    :fetchFn="shipStore.loadAllByPage"
  />
</template>

<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'

import { useShipsStore } from '@/store/ships'

import { useRouter, useRoute } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'
import { onMounted } from 'vue'
import Pagination from '@/components/base/BasePagination.vue'
import * as events from 'events'
const shipStore = useShipsStore()

const router = useRouter()
const route = useRoute()

let initPage = 1

onMounted(async () => {
  if (route?.query?.search) {
    await onSearch(`${route?.query?.search}`)
    return
  }
  if (route?.query?.page && +route?.query?.page > 1) {
    initPage = +route?.query?.page
  } else {
    await router.push({ query: { page: 1 } })
  }
  await shipStore.loadAllShips({ params: { page: initPage } })
})

async function onShipClick(e: Event) {
  if (e.target instanceof Element) {
    await router.push(`/view-ship/${e.target?.id}`)
  }
}
async function onSearch(data: string) {
  if (!('search' in route?.query) || (data && route?.query?.search !== data)) {
    await shipStore.loadFilteredShip(data)
    await router.push({ query: { search: data, page: 1 } })
  }
  if (!data) {
    await router.push({ query: { page: 1 } })
    await shipStore.loadAllShips({ params: { page: 1 } })
  }
}
</script>

<style scoped></style>
