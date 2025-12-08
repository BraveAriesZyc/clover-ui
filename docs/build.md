# 构建与集成说明

## 构建目标

本项目提供两套独立的打包：

- 组件库打包（UMD/ESM + 按需 + 类型）：输出到 `dist/library`
- 应用打包（完整站点）：输出到 `dist/app`

两者均开启 sourcemap，并在构建前执行 TypeScript 类型检查。

## 命令

- 组件库：`pnpm build:library`
- 应用：`pnpm build:app`
- 全量：`pnpm build:all`
- 开发 HMR：`pnpm dev:app`

## 组件库产物结构（dist/library）

- `clover-ui.es.js` / `clover-ui.cjs.js` / `clover-ui.umd.js`
- `assets/clover-ui.css`
- `components/*/index.js`（按需模块，保留模块结构）
- `types/index.d.ts` 与 `types/components/*/index.d.ts`（完整类型）

## 安装与使用

在消费项目中：

```
pnpm add clover-ui vue @iconify/vue
```

- 全量：
```
import 'clover-ui/style.css'
import CloverUI from 'clover-ui'
app.use(CloverUI)
```

- 按需：
```
import 'clover-ui/style.css'
import ZButton from 'clover-ui/components/button'
app.use(ZButton)
```

## 私有仓库与本地联调

- 发布到私有 npm（推荐）或使用 `pnpm link`/`npm link`
- 本地联调：在库目录执行 `pnpm link`，在消费项目执行 `pnpm link clover-ui`
- 移除所有相对路径引用，统一通过包名 `clover-ui` 导入

## 依赖管理

- `peerDependencies`: `vue`, `@iconify/vue`
- `devDependencies`: 构建相关依赖（vite、typescript、vite-plugin-dts 等）

## 应用打包（dist/app）

- 包含站点全部资源，已配置 `manualChunks` 拆分 `vue`、`vue-router`、`@iconify/vue`
- 生产优化：压缩与分包由 Vite/Rollup 默认策略完成

## 版本与源码映射

- 产物版本号与 `package.json.version` 保持一致
- sourcemap 默认开启，便于调试与定位问题

