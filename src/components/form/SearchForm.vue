<template>
  <div class="search-form">
    <form @submit.prevent="onFormSubmit">
      <BaseInput
        customWrapClass="search-form__input"
        v-model="inputData"
        maxlength="50"
        placeholder="Поиск..."
      />
      <div class="search-form__submit">
        <button :disabled="buttonDisabled" type="submit">Найти</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../base/BaseInput.vue'
import { computed, ref } from 'vue'
const emit = defineEmits<{
  formSubmit: [inputData: string]
}>()

const inputData = ref('')

const buttonDisabled = computed(() => !inputData.value.length)

function onFormSubmit() {
  emit('formSubmit', inputData.value)
}
</script>

<style scoped></style>
