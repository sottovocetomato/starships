<template>
  <footer class="container-fluid">
    <div class="theme-switcher" @click="toggleCurrentTheme" aria-roledescription="theme-switcher">
      <MoonIcon v-if="isLightTheme" />
      <SunIcon v-else />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import SunIcon from '../icons/IconSun.vue'
import MoonIcon from '../icons/IconMoon.vue'

const { toggleCurrentTheme, isLightTheme } = useTheme()
</script>

<style scoped></style>
