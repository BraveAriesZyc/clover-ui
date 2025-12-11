# 架构设计

## 模块划分

- 组件库：`packages/components/*`（导出统一于 `packages/index.ts`）
- 样式系统：`packages/theme-chalk/src/*.css`（支持全量与按需）
- 类型声明：`packages/types/*`（全局组件与顶层入口）
- 演示站点：`src/*`（页面、路由、布局、示例与文档）

## 数据流与依赖

- 组件通过 `withInstall` 提供插件化安装（`app.use`）
- 类型通过 `vite-plugin-dts` 生成到 `dist/library/types/**`
- 图标依赖 `@iconify/vue`，按需渲染图标集合

## 构建输出

- 库格式：`ES/CJS/UMD`（`vite.library.config.ts`）
- 保留模块：`preserveModules`（`vite.library.modules.config.ts`）
- 应用站点：`vite.app.config.ts` 输出到 `dist/app`
