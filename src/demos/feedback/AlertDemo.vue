<script setup lang="ts">
import { useRouter } from 'vue-router'
import DisplayPage from '../../components/Layout/DisplayPage.vue'
const router = useRouter()
function goDocs() { router.push('/docs/alert') }
</script>

<template>
    <DisplayPage title="Alert 警告提示" @goDocs="goDocs">
        <div class="content__placeholder">此处为警告提示组件的演示占位页面。</div>
    </DisplayPage>
</template>

<style scoped>
    .content__placeholder {
        color: var(--color-muted);
        border: 1px dashed var(--color-border);
        border-radius: 8px;
        padding: 16px;
    }
</style>
