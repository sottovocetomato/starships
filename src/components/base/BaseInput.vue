<template>
  <div :class="customWrapClass">
    <input
      v-model="model"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :class="customClass"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :aria-invalid="ariaInvalid"
    />
    <small v-if="ariaInvalid" id="invalid-helper">Not valid input</small>
  </div>
</template>

<script setup lang="ts">
type Booleanish = boolean | 'true' | 'false'
export interface InputProps {
  type: string
  name?: string
  id?: string
  placeholder?: string
  ariaLabel?: string
  ariaInvalid?: Booleanish | 'grammar' | 'spelling' | undefined
  customWrapClass?: string
  customClass?: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  maxlength?: string
  minlength?: string
}
const {
  type = 'text',
  name = 'input',
  ariaLabel = 'Text Input',
  required = true,
  readonly = false,
  disabled = false,
  ariaInvalid = null,
  customWrapClass = '',
  customClass = '',
  placeholder = 'Введите текст',
  id = '',
  maxlength = '225',
  minlength = '1',
} = defineProps<InputProps>()

const model = defineModel()
</script>

<style scoped></style>
