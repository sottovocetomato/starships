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
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'

import { useShipsStore } from '@/store/ships'
import TableComponent from '@/components/base/TableComponent.vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
const shipStore = useShipsStore()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  if (route?.query?.search) {
    await onSearch(route?.query?.search)
  } else {
    await shipStore.loadAllShips({ params: { page: 1 } })
  }
})

async function onShipClick(e) {
  console.log(e.target)
  await router.push(`/view-ship/${e.target.id}`)
}
async function onSearch(data) {
  await shipStore.loadFilteredShip(data)
  if (!route?.query?.search || route?.query?.search !== data) {
    await router.push({ path: '/', query: { search: data } })
  }
  if (!data) {
    await router.push({ path: '/', query: {} })
  }
}
</script>

<style scoped></style>
