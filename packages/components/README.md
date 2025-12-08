# 组件开发流程（packages/components）

适用于在 `packages` 下新增通用组件，并完成导出、注册与类型声明。

## 目录与命名
- 组件目录：`packages/components/<name>/`
- 组件文件：`packages/components/<name>/src/Z<Name>.vue`
- 入口导出：`packages/components/<name>/index.ts`
- 样式文件：`packages/theme-chalk/src/Z<Name>.css`（并在 `packages/theme-chalk/index.css` 引入）
- 组件前缀统一使用 `Z`（如：`ZCard`、`ZButton`）。

## 创建步骤
1. 新建组件目录与 Vue 文件
```
packages/components/<name>/src/Z<Name>.vue
```
最小示例：
```
<script setup lang="ts">
</script>
<template>
  <div class="z-<name>"><slot /></div>
</template>
```

2. 新建入口并使用 `withInstall` 注册
```
packages/components/<name>/index.ts
```
示例：
```
import ZNameVue from "./src/Z<Name>.vue"
import { withInstall } from "../../utils/withInstall"
const ZName = withInstall(ZNameVue, "ZName")
export default ZName
export { ZName }
```

3. 添加主题样式并在主题入口引入
- 新增：`packages/theme-chalk/src/Z<Name>.css`
- 在：`packages/theme-chalk/index.css` 末尾添加：
```
@import url('./src/Z<Name>.css');
```
样式规范：优先使用 CSS 变量（如 `--color-bg`、`--color-text`、`--color-border`）。

4. 在包入口导出与全局注册
- 文件：`packages/index.ts`
- 导入并在 `install(app)` 中 `app.use(ZName)`，同时在导出列表中加入 `ZName`。

5. 类型声明（必做）
- 文件：`packages/types/vue.d.ts`
- 在 `GlobalComponents` 接口中添加：
```
ZName: typeof import('../index')['ZName']
```
这样即可在模板中直接使用 `<ZName />` 获得类型提示。

## 使用示例
- 引入包后（`app.use(CloverUI)`），在任意页面：
```
<ZName>内容</ZName>
```

## 添加 Demo 展示（根项目 src）
- 位置：`src/demos/<Name>Demo.vue`
- 示例：
```
<script setup lang="ts">
</script>
<template>
  <div class="section">
    <div class="section__title"><Name> Demo</div>
    <ZName bordered hoverable padding="md">示例内容</ZName>
  </div>
</template>
```
- 路由：在 `src/router/index.ts` 增加路由项，例如：
```
import NameDemo from '../demos/NameDemo.vue'
{ path: '/name', component: NameDemo }
```
- 侧边导航：在 `src/data/nav.ts` 的对应分组添加：
```
{ key: '/name', label: 'Name 组件', short: 'Name', icon: 'bx:component' }
```
这样即可在左侧导航中看到新组件的演示页。

## API 文档要求（必须）
- 位置：`src/demos/docs/<name>.api.ts`，导出 `attributes`、`events`、`slots`、`functions`、`configs`（按需），用于展示 Element 风格的 API 表格。
- 独立文档页：跳转路由 `/docs/<name>`，页面组件 `src/pages/docs/DocsPage.vue` 会按 `name` 动态加载上述 API 数据。
- Demo 页约定：在演示页标题右侧提供一个“文档”按钮，点击后前往对应 `/docs/<name>` 页面。

## 规范强制检查（CI/Test）
- 测试文件：`tests/components-docs.spec.ts`
- 规则：
  - `packages/components/*` 下的每个组件都必须有对应 `src/demos/docs/<name>.api.ts` 文件；
  - 在 `src/demos/**` 任意演示页中，必须能检索到该组件的标签（例如 `<ZButton`、`<ZInput` 等）；
- 运行：
  - `npm run test` 或 `npm run test:watch`；若缺少 Demo/文档，测试会失败并给出缺失项提示。

## 图标封装与来源（SVG 推荐）
- 统一使用 `<ZIcon name="<prefix>:<icon>" />`，优先渲染离线 SVG（Iconify JSON）。
- 将图标集 JSON 放在 `public/icons/<prefix>.json`，例如：`mdi.json`、`ri.json`、`bi.json`、`bx.json`、`fa6-solid.json` 等。
- 组件会优先加载 `/icons/<prefix>.json` 并渲染内联 SVG；未命中时显示占位（不再自动加载字体或外部 CDN）。
- 推荐迁移到 SVG，提升可靠性与显示质量；如需兼容历史字体方案，可单独引入字体并在项目层自行处理。
## 注意事项
- 命名统一、样式使用主题变量，避免硬编码颜色。
- 组件应保持最小 API，扩展用 `props` 与 `slots`。
- 若组件包含交互态，请提供 `hover/active/disabled` 对应的样式。
- 更新类型声明后，若编辑器未即时生效，请重启 TS 服务或编辑器。

## 组件分类规则（必须）
- 新增组件必须根据“类型分类”归档到对应分组；若当前项目没有该分组，则按业内常见分类新增分组。
- 推荐分组（与主流 UI 一致）：
  - 基础：Typography、Color、Layout、Container、Card 等
  - 表单：Input、Select、Radio、Checkbox、Switch、Slider、Upload 等
  - 数据展示：Avatar、Badge、Tag、Table、List、Descriptions、Statistic 等
  - 反馈：Message、Notification、Modal/Dialog、Drawer、Progress、Result 等
  - 导航：Breadcrumb、Dropdown、Menu、Tabs、Pagination、Steps 等
  - 图标：Icon 集合与预览页
  - 其他：不便归类的通用组件，可后续抽象迁移
- 操作方式：
  - 在 `src/data/nav.ts` 的 `groups` 中找到对应分组（如“基础”“表单”等），将组件 Demo 路由添加到该分组的 `items` 中。
  - 若不存在分组，则在 `groups` 中新增分组对象（含 `name`、`icon` 与 `items`），并在其中添加该组件的导航项。
  - 示例：
    - 新增 Badge（数据展示）→ 在 `name: '数据展示'` 分组的 `items` 中添加 `{ key: '/badge', label: 'Badge 徽标', short: 'Badge', icon: 'bx:badge' }`
    - 新增 Steps（导航）→ 在 `name: '导航'` 分组的 `items` 中添加 `{ key: '/steps', label: 'Steps 步骤条', short: 'Steps', icon: 'bx:list-ol' }`
