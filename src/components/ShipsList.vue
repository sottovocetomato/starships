<template>
  <SearchForm />
  <div class="ships-list">
    <!--    <article v-for="ship in shipStore?.getAllShips" class="ship-card">-->
    <!--      <div class="card-column">-->
    <!--        <span> MGLT </span>-->
    <!--        <p>{{ ship.MGLT }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Вместимость груза </span>-->
    <!--        <p>{{ ship.cargo_capacity }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Запасы еды </span>-->
    <!--        <p>{{ ship.consumables }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Стоимост </span>-->
    <!--        <p>{{ ship.cost_in_credits }} Кр.</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Экипаж </span>-->
    <!--        <p>{{ ship.crew }} чел.</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Рейтинг гипердрайва </span>-->
    <!--        <p>{{ ship.hyperdrive_rating }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Длина </span>-->
    <!--        <p>{{ ship.length }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Производитель </span>-->
    <!--        <p>{{ ship.manufacturer }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Макс. скорость </span>-->
    <!--        <p>{{ ship.max_atmosphering_speed }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Модель/Имя </span>-->
    <!--        <p>{{ ship.model }}/{{ ship.name }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Кол-во пассажиров </span>-->
    <!--        <p>{{ ship.passengers }}</p>-->
    <!--      </div>-->
    <!--      <div class="card-column">-->
    <!--        <span> Класс корабля </span>-->
    <!--        <p>{{ ship.starship_class }}</p>-->
    <!--      </div>-->
    <!--    </article>-->
    <TableComponent :columns="columns" :rows="shipStore.getAllShips" />
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'

import { useShipsStore } from '@/store/ships'
import TableComponent from '@/components/base/TableComponent.vue'
const shipStore = useShipsStore()
await shipStore.loadAllShips({ params: { page: 1 } })

const columns: { name: string; value: string; append?: string }[] = [
  { name: 'MGLT', value: 'MGLT' },
  { name: 'Вместимость груза', value: 'cargo_capacity' },
  { name: 'Запасы еды', value: 'consumables' },
  { name: 'Стоимость', value: 'cost_in_credits', append: 'Кр.' },
  { name: 'Экипаж', value: 'crew', append: 'чел.' },
  { name: 'Рейтинг гипердрайва', value: 'hyperdrive_rating' },
  { name: 'Длина', value: 'length' },
  { name: 'Производитель', value: 'manufacturer' },
  { name: 'Макс. скорость', value: 'max_atmosphering_speed' },
  { name: 'Модель', value: 'model' },
  { name: 'Имя', value: 'name' },
  { name: 'Кол-во пассажиров', value: 'passengers', append: 'чел.' },
  { name: 'Класс корабля', value: 'starship_class' },
]
</script>

<style scoped></style>
