# API 参考

## 组件导入
- 根入口（聚合）：`import { ZButton } from 'clover-ui'`
- 子路径（按需）：`import { ZButton } from 'clover-ui/components/button'`
- 样式按需：
  - `import 'clover-ui/theme-chalk/variables.css'`
  - `import 'clover-ui/theme-chalk/ZButton.css'`

## Loading Service
- `openLoading(options)`
  - 参数：`text?: string`, `fullscreen?: boolean`
  - 返回：`close(): void`
- `useLoading(config)`
  - 参数：`{ delay?: number }`
  - 返回：`{ open, close }`

## 图标组件
- `ZIcon`, `Icon`, `SvgIcon`
  - 通用属性：`size`, `color`, `spin`, `title`, `ariaHidden`

## 路由与文档
- 文档页：`/docs/:name`，数据源 `src/demos/docs/*.api.ts`
