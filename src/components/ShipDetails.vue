<template>
  <div class="container">
    <article :aria-busy="shipStore.isLoading" v-if="shipStore.isLoading"></article>
    <article v-else>
      <div class="ship-info-card__content"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useShipsStore } from '@/store/ships'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const shipStore = useShipsStore()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await shipStore.loadShipById(route.params.id as number)
})
</script>

<style scoped></style>
