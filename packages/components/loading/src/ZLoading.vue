<script setup lang="ts">
const open = defineModel<boolean>({ default: false })
const props = defineProps<{ text?: string; fullscreen?: boolean; mask?: boolean; variant?: 'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue' }>()
</script>

<template>
  <Teleport to="body" v-if="props.fullscreen">
    <div v-if="open" class="z-loading z-loading--fullscreen" :data-mask="props.mask" :data-variant="props.variant || 'primary'">
      <div class="z-loading__box">
        <div class="z-loading__spinner"></div>
        <div v-if="props.text" class="z-loading__text">{{ props.text }}</div>
      </div>
    </div>
  </Teleport>
  <div v-else class="z-loading__container">
    <slot></slot>
    <div v-if="open" class="z-loading z-loading--cover" :data-mask="props.mask" :data-variant="props.variant || 'primary'">
      <div class="z-loading__box">
        <div class="z-loading__spinner"></div>
        <div v-if="props.text" class="z-loading__text">{{ props.text }}</div>
      </div>
    </div>
  </div>
</template>
