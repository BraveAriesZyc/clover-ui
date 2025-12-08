## 目标
- 按通用规范配置并发布一个可复用的 npm 库，提供 ESM + CJS + 类型声明。
- 明确 `exports` 映射、`peerDependencies`、发布白名单、CSS 处理与类型产物路径。
- 建立可验证的构建与发布流程，确保在外部项目中 `import`/`require` 与 TS 类型均可用。

## 现状诊断
- 使用 pnpm 工作区；根包发布，子包私有。
- 构建：Vite 库模式输出 `clover-ui.es.js` 与 `clover-ui.umd.js`（`external: ['vue']`）。
- 类型：`vite-plugin-dts` 输出到 `dist/types`；但 `package.json` 的 `types` 指向 `./dist/index.d.ts`（不一致）。
- 发布：`files` 仅包含 `dist` 和 `README.md`；无 `publish` 脚本；`exports` 仅提供 `import/require`。

## 具体改动（不改变技术栈）
- 调整根 `package.json`：
  - `types`: 改为 `./dist/types/index.d.ts`。
  - 增强 `exports`：
    - `{".": { "types": "./dist/types/index.d.ts", "import": "./dist/clover-ui.es.js", "require": "./dist/clover-ui.cjs" }}`。
    - 若提供样式，增加子路径：`"./styles.css": "./dist/styles.css"`。
  - `main`: 改为 `./dist/clover-ui.cjs`（新增 CJS 产物）。
  - `module`: 保持 `./dist/clover-ui.es.js`。
  - `files`: 扩展为 `["dist", "README.md", "LICENSE"]`。
  - `peerDependencies`: `{"vue": "^3.3.0"}`（与现有 external 保持一致）。
  - `sideEffects`: `[