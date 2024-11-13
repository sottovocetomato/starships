<template>
  <SearchForm @formSubmit="onSearch" />
  <div class="ships-list container">
    <article aria-busy="true" v-if="shipStore.isLoading"></article>
    <article
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
        <p class="trim">{{ ship?.model }}</p>
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
import TableComponent from '@/components/base/TableComponent.vue'
import { useRouter, useRoute, LocationQueryValue } from 'vue-router'
import { onMounted } from 'vue'
import Pagination from '@/components/base/Pagination.vue'
const shipStore = useShipsStore()

const router = useRouter()
const route = useRoute()

let initPage: number | LocationQueryValue = 1

onMounted(async () => {
  console.log('mounted')
  if (route?.query?.search) {
    await onSearch(route?.query?.search)
    return
  }
  if (route?.query?.page > 1) {
    initPage = route?.query?.page as LocationQueryValue
  } else {
    await router.push({ query: { page: 1 } })
  }
  await shipStore.loadAllShips({ params: { page: initPage } })
})

async function onShipClick(e) {
  console.log(e.target)
  await router.push(`/view-ship/${e.target.id}`)
}
async function onSearch(data) {
  await shipStore.loadFilteredShip(data)
  if (!route?.query?.search || route?.query?.search !== data) {
    await router.push({ query: { search: data, page: 1 } })
  }
  if (!data) {
    await router.push({ query: {} })
  }
}
</script>

<style scoped></style>
