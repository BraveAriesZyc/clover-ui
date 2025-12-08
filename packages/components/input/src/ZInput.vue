<script setup lang="ts" >
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  type?: string
  maxlength?: number
  invalid?: boolean
  name?: string
  id?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number): void
  (e: 'input', v: string | number): void
  (e: 'change', v: string | number): void
  (e: 'focus', evt: FocusEvent): void
  (e: 'blur', evt: FocusEvent): void
}>()

const innerValue = ref(props.modelValue ?? '')

watch(() => props.modelValue, v => {
  if (v !== innerValue.value) innerValue.value = v as any
})

const classes = computed(() => [
  'z-input',
  { 'is-disabled': props.disabled, 'is-invalid': props.invalid }
])

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  const v = target.value
  innerValue.value = v
  emit('update:modelValue', v)
  emit('input', v)
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('change', target.value)
}

function onFocus(e: FocusEvent) {
  emit('focus', e)
}

function onBlur(e: FocusEvent) {
  emit('blur', e)
}
</script>

<template>
  <div :class="classes">
    <span class="z-input__prefix"><slot name="prefix"></slot></span>
    <input
        class="z-input__inner"
        :value="innerValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :type="props.type ?? 'text'"
        :maxlength="props.maxlength"
        :name="props.name"
        :id="props.id"
        :aria-invalid="props.invalid ? 'true' : 'false'"
        :aria-disabled="props.disabled ? 'true' : 'false'"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
    />
    <span class="z-input__suffix"><slot name="suffix"></slot></span>
  </div>
</template>
