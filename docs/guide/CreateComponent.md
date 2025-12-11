# 新组件创建流程（规范）

## 目录结构
- `packages/components/<name>/`
  - `index.ts`：出口文件（使用 `withInstall`）
  - `src/Z<Name>.vue`：组件实现
- `packages/theme-chalk/src/Z<Name>.css`：主题样式（按需）
- `packages/index.ts`：聚合导出与 `install(app)` 注册
- `packages/types/vue.d.ts`：全局组件类型映射（Volar 支持）
- `src/demos/<group>/<Name>Demo.vue`：展示页（使用 `DisplayPage`）
- `src/demos/docs/<name>.api.ts`：站内 API 文档数据源
- `src/data/docs.ts`：注册文档入口（`/docs/<name>`）
- `src/data/nav.ts`：在左侧导航指定分组添加 Demo 跳转
- `src/router/index.ts`：新增 Demo 路由（如需）

## 组件实现
- `packages/components/<name>/src/Z<Name>.vue`
```vue
<script setup lang="ts">
// 组件逻辑
</script>
<template>
  <div class="z-<name>"><slot /></div>
</template>
```

- `packages/components/<name>/index.ts`
```ts
import ZNameVue from './src/ZName.vue'
import { withInstall } from '../../utils/withInstall'
const ZName = withInstall(ZNameVue, 'ZName')
export default ZName
export { ZName }
```

## 主题样式
- `packages/theme-chalk/src/Z<Name>.css`
```css
.z-<name> { /* 组件样式 */ }
```
- 在 `packages/theme-chalk/index.css` 引入（全量样式）：
```css
@import url('./src/Z<Name>.css');
```

## 组件导出与注册
- `packages/index.ts` 聚合导出与安装：
```ts
import ZName from './components/<name>'
export { ZName }
export default { install(app) { app.use(ZName) /* ... */ } }
```

## 类型注册（全局组件）
- `packages/types/vue.d.ts` 中添加：
```ts
ZName:
  | (typeof import('../components/<name>'))['ZName']
  | (typeof import('../index'))['ZName']
```

## 文档（站内 API）
- `src/demos/docs/<name>.api.ts`
```ts
export const attributes = [
  { name: 'propA', type: 'string', default: "", desc: '示例属性' },
]
export const slots = [
  { name: 'default', desc: '默认插槽' },
]
export const events = [
  { name: 'change', desc: '示例事件' },
]
export const functions = []
export const types = []
```
- `src/data/docs.ts` 追加：
```ts
{ key: '<name>', title: 'ZName 组件', short: 'ZName' }
```

## Demo 展示页（使用 DisplayPage）
- `src/demos/<group>/<Name>Demo.vue`
```vue
<script setup lang="ts">
import DisplayPage from '../../components/Layout/DisplayPage.vue'
import { useRouter } from 'vue-router'
import { ZName } from '../../../packages'
const router = useRouter()
function goDocs() { router.push('/docs/<name>') }
</script>
<template>
  <DisplayPage title="ZName 组件" @goDocs="goDocs">
    <ZName>内容</ZName>
  </DisplayPage>
</template>
```
- 导航：在 `src/data/nav.ts` 相关分组追加 Demo 跳转项
- 路由：在 `src/router/index.ts` 注册 Demo 组件路径（如尚未注册）

## 校验与发布
- 运行类型检查与构建：
- `pnpm run typecheck`
- `pnpm run build:library`、`pnpm run build:app`

## 可选：按需样式用法
- 全量：`import 'clover-ui/styles.css'`
- 按需：
  - `import 'clover-ui/theme-chalk/variables.css'`
  - `import 'clover-ui/theme-chalk/Z<Name>.css'`

## 命名与约定
- 组件名统一使用 `Z` 前缀与帕斯卡命名：`ZName`
- 文件命名：`src/ZName.vue`、`index.ts`、样式 `ZName.css`
- Props、Emits 使用 `defineProps`、`defineEmits` 并标注类型与默认值
- 插槽命名与参数遵循现有模式（如 `header`、`sidebar` 插槽参数 `{ toggle, collapsed }`）

## 可选：服务模式组件
- 若组件包含服务函数（如消息、加载），添加 `src/service.ts` 并在组件入口导出：
```ts
// packages/components/<name>/index.ts
export { openName, name } from './src/service'
```
- 在根入口聚合导出：
```ts
// packages/index.ts
export { openName, name } from './components/<name>'
```

## 全局组件类型完整示例
在 `packages/types/vue.d.ts` 的 `GlobalComponents` 中追加：
```ts
ZName:
  | (typeof import('../components/<name>'))['ZName']
  | (typeof import('../index'))['ZName']
```

## 导航与路由示例
- 导航分组示例（`src/data/nav.ts`）：
```ts
{ key: '/<demo-path>', label: 'ZName 组件', short: 'ZName', icon: 'bx:layout' }
```
- 路由示例（`src/router/index.ts`）：
```ts
{ path: '/<demo-path>', component: () => import('../demos/<group>/<Name>Demo.vue') }
```

## 主题变量使用建议
- 优先使用已有主题变量：`var(--color-border)`、`var(--color-bg)`、`var(--color-text)`、`var(--layout-*)`
- 新增变量请在 `theme-chalk/variables.css` 中定义，并遵循命名前缀

## Demo 页面规范
- 统一使用 `DisplayPage` 提供标题与“文档”按钮
- 页面内部结构使用弹性列布局（容器需具备 `flex: 1; min-height: 0;` 以保证网格/列表区域正常渲染）
- 如需吸顶工具条，参考 `IconDemo.vue` 的 `.tools` 样式实践
