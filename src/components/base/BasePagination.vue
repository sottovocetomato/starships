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
const { pageMeta = {}, fetchFn = null } = defineProps<PaginationProps>()

const currentPage = ref<number>(+route?.query?.page || 1)

async function loadPreviousPage(): Promise<void> {
  if (!pageMeta?.previous || !fetchFn) return
  currentPage.value--
  await router.push({ query: { ...route?.query, page: currentPage.value } })
  await fetchFn(pageMeta?.previous)
}
async function loadNextPage(): Promise<void> {
  if (!pageMeta?.next || !fetchFn) return
  currentPage.value++
  await router.push({ query: { ...route?.query, page: currentPage.value } })
  await fetchFn(pageMeta?.next)
}
</script>

<style scoped></style>
