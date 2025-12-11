<script setup lang="ts">
import { message } from '../../../packages'
import { useRouter } from 'vue-router'
import DisplayPage from '../../components/Layout/DisplayPage.vue'
let handler: any = undefined
const router = useRouter()
function goDocs() { router.push('/docs/message') }
</script>

<template>
    <DisplayPage title="Message 消息提示" @goDocs="goDocs">
        <div class="row">
            <button class="btn" @click="message('这是一条普通消息')">默认</button>
            <button class="btn" @click="message.success('操作成功')">成功</button>
            <button class="btn" @click="message.warning('注意事项')">警告</button>
            <button class="btn" @click="message.error('操作失败')">错误</button>
            <button class="btn" @click="message({ text: '5 秒后自动关闭', type: 'info', duration: 5000 })">自定义</button>
            <button class="btn" @click="handler = message({ text: '手动关闭的消息', type: 'warning', duration: 0, showClose: true })">手动</button>
            <button class="btn" @click="handler?.close?.()">关闭</button>
        </div>
    </DisplayPage>
</template>

<style scoped>
    .row { display:flex; gap:8px; }
    .btn { display:inline-flex; align-items:center; justify-content:center; height:28px; padding:0 10px; border:1px solid var(--color-border); border-radius:6px; background: var(--color-bg); color: var(--color-muted); cursor:pointer; }
</style>
