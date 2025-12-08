## 目标
- 基于现有目录结构，完善一个可发布到 npm 的 Vue 3 UI 库，提供 ES/CJS/UMD 与类型声明，并支持按需引入与统一样式。
- 不改变技术栈（Vite + TypeScript + Vue 3），补齐 exports/types/样式聚合与发布脚本。

## 项目现状
- 库模式构建已就绪（vite.config.ts:6–34），产物包含 `es/cjs/umd`，并将 `vue` 声明为外部依赖。
- 根入口聚合并注册组件（packages/lib/index.ts:1–14），目录已分层：`components`、`theme-chalk`、`lib`。
- 类型通过 `vite-plugin-dts` 生成到 `dist/types`，但根 `package.json` 的 `types` 指向 `./dist/index.d.ts`，与实际输出不一致。
- 主题样式有 `packages/theme-chalk/index.css`，但组件样式未统一聚合，且未通过 `exports` 暴露样式子路径。

## 目录规范（保持现有并补强）
- `packages/components/<name>/src/<PascalName>.vue`：单文件组件源码
- `packages/components/<name>/index.ts`：组件导出（后续支持 withInstall）
- `packages/lib/index.ts`：库入口，导出所有组件并提供 `install`
- `packages/lib/utils/withInstall.ts`：为按需引入提供 `install` 能力（新增）
- `packages/theme-chalk/src/<Component>.css`：组件样式源文件（按组件拆分）
- `packages/theme-chalk/index.css`：聚合所有组件样式的入口

## 构建与产物
- 保持 Vite 库模式与当前配置（vite.config.ts:6–34）。
- 在 `packages/lib/index.ts` 顶部可选择性 `import '../theme-chalk/index.css'` 以生成独立 CSS 产物（默认不自动注入，推荐由使用者显式引入）。
- 产物目录：`dist/clover-ui.es.js`、`dist/clover-ui.cjs.js`、`dist/clover-ui.umd.js`、`dist/types/**`、`dist/assets/index.css`。

## 组件约定
- 组件命名：统一使用 `Z<Button|Input|...>`，`name` 保持与导出一致，便于全局注册与按需引入。
- 导出策略：
  - 统一在 `packages/lib/index.ts` 提供默认插件 `install(app)` 与命名导出（当前已具备）。
  - 为按需引入创建 `withInstall`，让单个组件支持 `app.use(ZButton)`。
- API：每个组件最少提供 `props`/`emits` 与基础样式类名，保持无副作用（样式走 theme-chalk）。

## 样式与主题
- 组件内仅使用规范类名（如 `z-button`），不直接写样式。
- 在 `packages/theme-chalk/src/` 下为每个组件新增/完善样式文件，并在 `packages/theme-chalk/index.css` 聚合。
- 发布时通过 `exports` 暴露样式子路径：`"./styles.css": "./dist/assets/index.css"`，让使用者按需引入：`import 'clover-ui/styles.css'`。
- 在根 `package.json` 设置 `sideEffects: ["*.css"]` 或明确样式路径，避免打包器错误地摇树去除样式。

## 类型声明
- 纠正根 `package.json` 的 `types` 指向 `./dist/types/index.d.ts`，并在 `exports` 为根入口添加 `types` 映射。
- 保持 `vite-plugin-dts` 配置（vite.config.ts:9–13），产出到 `dist/types`。

## 开发与预览
- 开发：`pnpm dev`（脚本已就绪，package.json:26–29）。
- 预览：`pnpm preview`（构建后本地预览）。
- 示例应用继续在 `src/main.ts` 挂载并使用插件（src/main.ts:4–9）。

## 发布与使用
- 发布改动：
  - 根 `package.json`：
    - `types`: `./dist/types/index.d.ts`
    - `main`: `./dist/clover-ui.cjs.js`
    - `module`: `./dist/clover-ui.es.js`
    - `exports`: `{ ".": { "types": "./dist/types/index.d.ts", "import": "./dist/clover-ui.es.js", "require": "./dist/clover-ui.cjs.js" }, "./styles.css": "./dist/assets/index.css" }`
    - `peerDependencies`: `{ "vue": "^3.5.0" }`（与 external 保持一致）
    - `sideEffects`: `["./dist/assets/index.css"]`
  - 新增 `release` 脚本（如 `pnpm build` 后 `npm publish --access public`）。
- 使用示例：
  - 全量：`app.use(CloverUI)`；或 `import { ZButton } from 'clover-ui'`
  - 样式：`import 'clover-ui/styles.css'`

## 验证清单
- 构建后检查 `dist/types/index.d.ts` 是否存在并与 `exports.types` 一致。
- 检查 `dist/assets/index.css` 是否生成且能通过子路径导入。
- 使用外部示例项目验证 `import`/`require` 的分别可用。
- 验证按需引入：`app.use(ZButton)` 与命名导出 tree-shaking 生效。

## 后续扩展（可选）
- 增加单测（Vitest + Vue Test Utils），保障 props/emits 与渲染。
- 为主题提供变量与暗色模式（CSS 变量），支持定制化。
- 若需要更细粒度的子路径导出（`clover-ui/button`），可改为多入口构建，但初期保持单入口 + 命名导出即可。