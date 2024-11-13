<template>
  <header class="container-fluid">
    <a v-if="navText" class="secondary" href="#" @click="onLinkClick">{{ navText }}</a>
    <h2>StarShips</h2>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const previousPage = computed(() => {
  const lastPath = router.options.history.state.back
  return lastPath ? lastPath : ''
})

const navText = computed(() => {
  return route.name === 'home' ? '' : previousPage.value ? 'Назад' : 'На главную'
})

function onLinkClick() {
  previousPage.value ? router.push(`${previousPage.value}`) : router.push('/')
}
</script>

<style scoped></style>
