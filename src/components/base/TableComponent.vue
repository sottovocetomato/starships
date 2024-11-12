<template>
  <table class="table-wrap">
    <thead class="">
      <tr>
        <th scope="col" class="" v-for="column in columns" :key="column.name">
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, ind) in rows" :key="row?.id || row?.name" class="">
        <td v-for="(column, ind) in columns" :key="column.value" class="">
          {{ !column.boolean ? row[column?.value] : row[column?.value] ? 'Да' : 'Нет' }}
          <span>{{ row[column?.append] ?? '' }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <!--  <Pagination :page-meta="pageMeta" :fetch-fn="fetchFn" />-->
</template>

<script setup lang="ts">
import Pagination from '@/components/base/Pagination.vue'

import { computed, onMounted } from 'vue'
import { InputProps } from '@/components/base/BaseInput.vue'
export interface TableProps {
  columns: []
  rows: []
  onClickFn: Function
  pageMeta: {} | []
  fetchFn: Function
}

const {
  columns = [],
  rows = [],
  onClickFn = () => {},
  pageMeta = {},
  fetchFn = () => {},
} = defineProps<TableProps>()

onMounted(() => {
  if (fetchFn) {
    fetchFn()
  }
})
</script>

<style scoped></style>
