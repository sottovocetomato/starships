<template>
  <div class="ship-info container">
    <article :aria-busy="shipStore.isLoading" v-if="shipStore.isLoading"></article>
    <article v-else class="ship-info-card">
      <div class="ship-info-card__content">
        <div class="ship-info-card__content__row">
          <p>Модель</p>
          <p>{{ getСurrentShip.model }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Название</p>
          <p>{{ getСurrentShip.name }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Макс. скорость в атмосфере</p>
          <p>{{ getСurrentShip.max_atmosphering_speed }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>MGLT</p>
          <p>{{ getСurrentShip.MGLT }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Макс. грузоподъемность</p>
          <p>{{ getСurrentShip.cargo_capacity }} кг.</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Запасы провизии на экипаж</p>
          <p>{{ getСurrentShip.consumables }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Экипаж</p>
          <p>{{ getСurrentShip.crew }} чел.</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Рейтинг гипердрайва</p>
          <p>{{ getСurrentShip.hyperdrive_rating }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Длина корабля</p>
          <p>{{ getСurrentShip.length }} м.</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Производитель</p>
          <p>{{ getСurrentShip.manufacturer }}</p>
        </div>

        <div class="ship-info-card__content__row">
          <p>Макс. кол-во пассажиров</p>
          <p>{{ getСurrentShip.passengers }} чел.</p>
        </div>
        <div class="ship-info-card__content__row" v-if="getСurrentShip?.pilots_info?.length">
          <p>Известные пилоты</p>
          <p>{{ getСurrentShip.pilots_info.join(',') }}</p>
        </div>
        <div class="ship-info-card__content__row">
          <p>Класс корабля</p>
          <p>{{ getСurrentShip.starship_class }}</p>
        </div>
        <div class="ship-info-card__content__row" v-if="getСurrentShip?.films_info?.length">
          <p>Изображен в фильмах</p>
          <p>{{ getСurrentShip.films_info.join(',') }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useShipsStore } from '@/store/ships'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const shipStore = useShipsStore()

const { getСurrentShip } = storeToRefs(shipStore)

const route = useRoute()

onMounted(async () => {
  await shipStore.loadShipById(+route.params.id)
})
</script>

<style scoped></style>
