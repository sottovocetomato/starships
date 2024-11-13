<template>
  <div class="search-form">
    <form @submit.prevent="onFormSubmit">
      <BaseInput
        customWrapClass="search-form__input"
        v-model="inputData"
        maxlength="50"
        placeholder="Поиск"
        :required="false"
        type="search"
        @keyup.enter="onFormSubmit"
        @keydown="checkChar"
      />
      <div class="search-form__submit">
        <button type="submit">Найти</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../base/BaseInput.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const emit = defineEmits<{
  formSubmit: [inputData: string]
}>()
const route = useRoute()
const inputData = ref<string>(`${route?.query?.search ?? ''}`)

function onFormSubmit() {
  emit('formSubmit', inputData.value)
}
function checkChar(event: KeyboardEvent) {
  const char = event.key
  const isCharAllowed = /^[A-Za-zА-Яа-я0-9- ]+$/.test(char)
  if (event?.key?.length === 1 && !isCharAllowed) {
    event.preventDefault()
  }
}
</script>

<style scoped></style>
