<template>
  <!--  <header>-->
  <!--    <div class="wrapper">-->
  <!--      <nav>-->
  <!--        <RouterLink to="/">Home</RouterLink>-->
  <!--      </nav>-->
  <!--    </div>-->
  <!--  </header>-->
  <Suspense>
    <div class="page-wrap" :data-theme="currentTheme">
      <BaseHeader />
      <RouterView />
      <BaseFooter />
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'
import { useTheme } from '@/composables/useTheme'
const route = useRoute()
const { currentTheme, getCurrentTheme } = useTheme()
getCurrentTheme()
</script>
<style scoped></style>
