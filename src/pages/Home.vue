<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h1 class="title">安装指南</h1>
    <section class="block">
      <h2 class="subtitle">安装依赖</h2>
      <pre class="code"><code>pnpm add clover-ui vue @iconify/vue</code></pre>
    </section>
    <section class="block">
      <h2 class="subtitle">全局导入</h2>
      <pre class="code"><code>import { createApp } from 'vue'
import App from './App.vue'
import CloverUI from 'clover-ui'
import 'clover-ui/styles.css'

const app = createApp(App)
app.use(CloverUI)
app.mount('#app')</code></pre>
    </section>
    <section class="block">
      <h2 class="subtitle">按需引入</h2>
      <pre class="code"><code>import { createApp } from 'vue'
import App from './App.vue'
import 'clover-ui/styles.css'
import ZButton from 'clover-ui/components/button'

const app = createApp(App)
app.use(ZButton)
app.mount('#app')</code></pre>
    </section>
  </div>
</template>

<style scoped>
.home { max-width: 920px; margin: 0 auto; padding: 12px; color: var(--color-text); }
.title { font-size: 20px; font-weight: 700; margin: 8px 0 16px; }
.subtitle { font-size: 14px; font-weight: 600; color: var(--color-muted); margin: 0 0 8px; }
.block { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.code { background: var(--color-bg-muted); border-radius: 6px; padding: 10px; overflow: auto; }
</style>
