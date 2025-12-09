# 开发指南

## 环境搭建
- Node.js ≥ 18，pnpm ≥ 8
- 安装依赖：`pnpm i`

## 调试方法
- 开发预览：`pnpm run dev:app`
- 类型检查：`pnpm run typecheck`
- 代码格式化：`pnpm run format`

## 测试策略
- 类型测试位于 `tests/types/*`，通过 `vue-tsc` 校验
- 可按需补充 `vitest` 单元测试

## 代码规范
- 统一 4 空格缩进（`.editorconfig`、`.prettierrc.json`）
- 单一职责与清晰命名，必要处添加 JSDoc
