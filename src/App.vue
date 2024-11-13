<template>
  <!--  <header>-->
  <!--    <div class="wrapper">-->
  <!--      <nav>-->
  <!--        <RouterLink to="/">Home</RouterLink>-->
  <!--      </nav>-->
  <!--    </div>-->
  <!--  </header>-->
  <Suspense>
    <div class="page-wrap" data-theme="dark">
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
const route = useRoute()
</script>
<style scoped></style>
