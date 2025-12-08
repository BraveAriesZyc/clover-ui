# Clover UI

一个基于 `Vue 3` + `TypeScript` + `Vite` 的轻量组件库与演示站点。

## 功能概览
- 组件库按插件形式提供 `install`，支持全量与按需引入
- 构建输出 `ES/CJS/UMD` 多格式，类型声明自动生成到 `dist/types`
- 演示站内置丰富的示例与文档页 `/docs/:name`
- 虚拟/固定网格、滚动标签、消息/提示/加载等常用组件

## 快速开始
```bash
# 安装依赖
pnpm i

# 本地开发（演示站）
pnpm dev

# 构建库（含类型声明与按目录保留的模块）
pnpm build

# 运行测试
pnpm test
```

## 使用示例
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import CloverUI from 'clover-ui'
import 'clover-ui/styles.css'

const app = createApp(App)
app.use(CloverUI)
app.mount('#app')
```

按需引入（示例）：
```ts
import { ZButton } from 'clover-ui/components/button'
```

## 路由与文档
- 组件演示：`/card`、`/button`、`/input`、`/scroll-chips`、`/fixed-grid`、`/virtual-grid`、`/message`、`/alert`、`/toast`、`/loading`、`/svg`、`/icons/:set?`
- 组件文档：`/docs/:name`（示例：`/docs/button`），由 `src/demos/docs/*.api.ts` 驱动

## 目录结构
- 应用入口：`src/main.ts`、`src/App.vue`、`src/router/index.ts`
- 组件库：`packages/components/*`，统一导出于 `packages/index.ts`
- 主题样式：`packages/theme-chalk/index.css`
- 文档与数据：`src/pages/docs/DocsPage.vue`、`src/demos/docs/*.api.ts`

## 构建与导出
- 主构建：`vite.config.ts`（库模式输出 `ES/CJS/UMD`）
- 模块保留：`vite.modules.config.ts`（`preserveModules` 输出 `dist/components/*`）
- 类型生成：`vite-plugin-dts` → `dist/types/**`
- 包导出：`package.json#exports` 提供根与子模块入口、样式导出

## 测试
- 使用 `vitest` + `@vue/test-utils`，环境为 `jsdom`
- 示例测试：`tests/components-docs.spec.ts`

## 贡献指南
请参考 `CONTRIBUTING.md` 获取开发规范、提交约定与文档编写指南。

## 许可证
MIT
