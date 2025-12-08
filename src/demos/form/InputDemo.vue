<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const text = ref('')
const router = useRouter()
function goDocs() { router.push('/docs/input') }
</script>

<template>
  <div class="section">
    <div class="section__title">Inputs <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton></div>
    <div class="row">
      <ZInput v-model="text" placeholder="请输入内容">
        <template #prefix><ZIcon name="bi:search" /></template>
      </ZInput>
      <ZInput v-model="text" :invalid="true" placeholder="错误示例">
        <template #suffix><ZIcon name="fa:exclamation-circle" /></template>
      </ZInput>
      <ZInput v-model="text" :disabled="true" placeholder="已禁用">
        <template #prefix><ZIcon name="ri:lock-line" /></template>
      </ZInput>
    </div>
  </div>
</template>

<style scoped>
.section { padding: 16px; }
.section__title { font-weight: 600; margin-bottom: 10px; }
.row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
</style>
