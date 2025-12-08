# 贡献指南

感谢关注 Clover UI！请遵循以下约定以保持代码与文档一致、可维护。

## 开发环境
- 包管理：`pnpm`
- 运行演示站：`pnpm dev`（Vite 开发服务器）
- 构建库与类型：`pnpm build`
- 运行测试：`pnpm test`

## 代码规范
- 使用 `TypeScript`，开启严格模式（`tsconfig.*.json` 已启用）
- 组件放置在 `packages/components/<name>`，入口为 `index.ts`，组件文件位于 `src/`
- 通过 `packages/utils/withInstall.ts` 提供 `install` 能力
- 样式统一在 `packages/theme-chalk/src/*`，汇总导出 `packages/theme-chalk/index.css`
- 避免在源码中引入未声明的第三方依赖

## 提交流程
- 从 `main` 创建功能分支，如：`feat/button-loading-state`
- 保持提交信息语义化：`feat: xxx`、`fix: xxx`、`docs: xxx`
- 合并前确保本地通过 `pnpm build` 与 `pnpm test`

## 文档编写
- 组件 API 文档位于 `src/demos/docs/*.api.ts`
- 文档页面为 `src/pages/docs/DocsPage.vue`，通过路由参数 `:name` 动态加载
- 为每个组件至少提供 `attributes`、`events`、`slots` 等基础项
- 如有函数能力（如 `openLoading`、`useLoading`），提供 `functions` 与 `configs` 说明

## 路由与导航
- 演示路由统一在 `src/router/index.ts`
- 侧边导航配置在 `src/data/nav.ts`，保持分组与标签一致

## 测试约定
- 使用 `vitest` 与 `@vue/test-utils`
- 对新增组件补充最小可行的渲染与交互测试

## 发布与导出
- 导出配置位于 `package.json#exports`
- 子模块导出路径：`clover-ui/components/<name>`，类型声明位于 `dist/types`

如需讨论重大改动，请先开 Issue 或草拟设计文档。
