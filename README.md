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

# 构建组件库（含类型声明与按目录保留的模块）
pnpm build:library

# 构建站点应用（输出至 dist/app）
pnpm build:app

# 运行测试
# （可选）本仓库不再提供测试命令快捷脚本
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

## 类型提示与 IDE 支持

- 在外部消费项目中，建议在 `env.d.ts` 中添加类型引用：
    - `/// <reference types="clover-ui/types" />`
- 全局注册（全部组件）：
    - `import CloverUI from 'clover-ui'`
    - `app.use(CloverUI)`
- 全局注册（单个组件）：
    - `import { ZIcon } from 'clover-ui/components/icon'` 或 `import { ZIcon } from 'clover-ui'`
    - `app.use(ZIcon)`
- 模板中无需显式导入标签，Volar 会正确识别全局组件

## 按需样式引入

- 引入某个组件时，仅加载该组件的样式：
    - 先引入变量：`import 'clover-ui/theme-chalk/variables.css'`
    - 再引入组件样式：
        - `import 'clover-ui/theme-chalk/ZButton.css'`
        - `import 'clover-ui/theme-chalk/ZIcon.css'`
- 全量样式仍可使用：`import 'clover-ui/styles.css'`

## 路由与文档

- 组件演示：`/card`、`/button`、`/input`、`/scroll-chips`、`/fixed-grid`、`/virtual-grid`、`/message`、`/alert`、`/toast`、`/loading`、`/svg`、`/icons/:set?`
- 组件文档：`/docs/:name`（示例：`/docs/button`），由 `src/demos/docs/*.api.ts` 驱动

## 目录结构

- 应用入口：`src/main.ts`、`src/App.vue`、`src/router/index.ts`
- 组件库：`packages/components/*`，统一导出于 `packages/index.ts`
- 主题样式：`packages/theme-chalk/index.css`
- 文档与数据：`src/pages/docs/DocsPage.vue`、`src/demos/docs/*.api.ts`

## 新建组件流程

- 详细说明见 `packages/components/README.md`
- 包含命名规范、入口导出、类型声明、Demo 与文档要求、按需样式引入

## 构建与导出

- 主构建：`vite.library.config.ts`（库模式输出 `ES/CJS/UMD`）
- 模块保留：`vite.library.modules.config.ts`（`preserveModules` 输出 `dist/library/components/*`）
- 类型生成：`vite-plugin-dts` → `dist/library/types/**`
- 包导出：`package.json#exports` 提供根与子模块入口、样式导出

## 测试

当前工作流仅保留构建与站点打包。如需添加测试，请运行 `vitest` 并补充用例。

## 贡献指南

请参考 `CONTRIBUTING.md` 获取开发规范、提交约定与文档编写指南。

## 许可证

MIT
