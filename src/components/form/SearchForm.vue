<template>
  <div class="search-form">
    <form @submit.prevent="onFormSubmit">
      <BaseInput
        customWrapClass="search-form__input"
        v-model="inputData"
        maxlength="50"
        placeholder="Поиск..."
        :required="false"
        type="text"
      />
      <div class="search-form__submit">
        <button type="submit">Найти</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../base/BaseInput.vue'
import { computed, ref } from 'vue'
import { LocationQueryValue, useRoute } from 'vue-router'
const emit = defineEmits<{
  formSubmit: [inputData: string]
}>()
const route = useRoute()
const inputData = ref<string | LocationQueryValue>(
  (route?.query?.search as LocationQueryValue) ?? ''
)

function onFormSubmit() {
  emit('formSubmit', inputData.value)
}
</script>

<style scoped></style>
