# Layout 目录说明

用于存放项目的布局相关代码，遵循模块化与可复用原则。

目录结构：
- `layout/components/` 可复用的布局组件（如 `Sidebar.vue`、`ThemeSettings.vue`）
- `layout/templates/` 页面级布局模板（如 `MainLayout.vue`），通过插槽承载页面内容
- `layout/hooks/` 布局相关的自定义 hooks（如 `useLayout.ts`）
- `layout/styles/` 布局专用样式与说明

使用规范：
- 页面入口（`src/App.vue`）应引用 `templates/MainLayout.vue` 并通过 `<slot>` 渲染页面内容
- 布局组件仅负责结构与交互，通用组件样式使用包内主题变量（packages/theme-chalk）
- 与布局相关的状态（如主题面板显隐）可在 hooks 中统一管理

导入路径：
- 布局内部引用遵循相对路径
- 从页面/模块引用布局组件时，建议从 `layout/templates` 或 `layout/components` 引入
