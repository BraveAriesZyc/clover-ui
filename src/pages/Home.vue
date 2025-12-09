<script setup lang="ts"></script>

<template>
    <div class="home">
        <section class="hero">
            <div class="hero__content">
                <h1 class="hero__title">Clover UI</h1>
                <p class="hero__desc">轻量、类型完善、可按需样式引入的 Vue 3 组件库</p>
                <div class="hero__actions">
                    <RouterLink to="/home" class="btn btn--primary">快速入门</RouterLink>
                    <RouterLink to="/docs/icon" class="btn btn--ghost">查看文档</RouterLink>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="feature">
                <div class="feature__title">按需样式</div>
                <div class="feature__desc">变量与组件样式独立引入，控制体积</div>
            </div>
            <div class="feature">
                <div class="feature__title">完备类型</div>
                <div class="feature__desc">全局组件识别与精准提示</div>
            </div>
            <div class="feature">
                <div class="feature__title">示例驱动</div>
                <div class="feature__desc">内置演示页与 API 表格</div>
            </div>
        </section>

        <section class="block">
            <h2 class="subtitle">快速入门（5 步）</h2>
            <pre class="code"><code>1) pnpm add clover-ui vue @iconify/vue
2) 在 main.ts 引入：
   import { createApp } from 'vue'
   import App from './App.vue'
3) 全量样式或变量：
   import 'clover-ui/styles.css' 或 import 'clover-ui/theme-chalk/variables.css'
4) 选择使用方式：
   全量：import CloverUI from 'clover-ui'; app.use(CloverUI)
   按需：import { ZButton, ZIcon } from 'clover-ui'; app.use(ZButton); app.use(ZIcon)
5) 运行：pnpm run dev:app</code></pre>
        </section>

        <section class="block">
            <h2 class="subtitle">功能特性</h2>
            <ul class="list">
                <li>基础：Button、Input、Card、Icon、Loading、ScrollChips</li>
                <li>布局：FixedGrid、VirtualGrid</li>
                <li>图标：@iconify/vue 支持海量图标</li>
                <li>类型：vite-plugin-dts 输出完整类型</li>
            </ul>
        </section>

        <section class="block">
            <h2 class="subtitle">安装与配置</h2>
            <pre class="code"><code>环境要求：Node.js ≥ 18，pnpm ≥ 8
依赖安装：pnpm i
开发预览：pnpm run dev:app
构建库：pnpm run build:library
构建站点：pnpm run build:app</code></pre>
        </section>
    </div>
    </template>

<style scoped>
    .home {
        max-width: 960px;
        margin: 0 auto;
        padding: 16px;
        color: var(--color-text);
    }
    .hero {
        position: relative;
        margin-bottom: 16px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(47, 239, 163, 0.15), rgba(47, 144, 239, 0.12));
    }
    .hero__content {
        padding: 24px 20px;
    }
    .hero__title {
        font-size: 28px;
        font-weight: 800;
        letter-spacing: 0.4px;
        margin: 0 0 6px;
    }
    .hero__desc {
        font-size: 13px;
        color: var(--color-muted);
        margin: 0 0 12px;
    }
    .hero__actions {
        display: flex;
        gap: 8px;
    }
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        border: 1px solid var(--color-border);
        color: var(--color-text);
        background: var(--color-bg);
        text-decoration: none;
    }
    .btn--primary {
        color: #0e7a46;
        background: #eafff6;
        border-color: #b6f3de;
    }
    .btn--ghost {
        background: transparent;
    }
    .features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 16px;
    }
    .feature {
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 10px;
        padding: 12px;
    }
    .feature__title {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 6px;
    }
    .feature__desc {
        font-size: 12px;
        color: var(--color-muted);
    }
    .subtitle {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-muted);
        margin: 0 0 8px;
    }
    .block {
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 12px;
    }
    .code {
        background: var(--color-bg-muted);
        border-radius: 6px;
        padding: 10px;
        overflow: auto;
    }
    .list {
        margin: 0;
        padding-left: 16px;
    }
    .text {
        margin: 0 0 8px;
        color: var(--color-text);
    }
</style>
