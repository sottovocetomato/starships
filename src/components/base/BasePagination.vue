<template>
  <div class="pagination">
    <div class="pagination__controls">
      <button
        class="pagination__controls__btn"
        @click.prevent="loadPreviousPage"
        :disabled="!pageMeta?.previous"
      >
        Назад
      </button>

      <button
        class="pagination__controls__btn"
        @click.prevent="loadNextPage"
        :disabled="!pageMeta?.next"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { PageMeta } from '@/types/page'

const router = useRouter()
const route = useRoute()

export interface PaginationProps {
  pageMeta: PageMeta
  fetchFn: Function | null
}
const { pageMeta = { previous: null, next: null }, fetchFn = null } = defineProps<PaginationProps>()

const currentPage = ref<number>(1)

function setCurrentPage(increase = true) {
  if ('page' in route?.query && route.query.page && currentPage.value !== +route.query.page) {
    currentPage.value = +route.query.page
  }
  if (increase) {
    currentPage.value++
  } else {
    if (currentPage.value > 1) currentPage.value--
  }
}

async function loadPreviousPage(): Promise<void> {
  if (!pageMeta?.previous || !fetchFn) return
  setCurrentPage(false)
  await router.push({ query: { ...route?.query, page: currentPage.value } })
  await fetchFn(pageMeta?.previous)
}
async function loadNextPage(): Promise<void> {
  if (!pageMeta?.next || !fetchFn) return
  setCurrentPage(true)
  await router.push({ query: { ...route?.query, page: currentPage.value } })
  await fetchFn(pageMeta?.next)
}
</script>

<style scoped></style>
