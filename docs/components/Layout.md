# ZLayout 通用布局

## 安装

```ts
import { ZLayout, ZLayoutHeader, ZLayoutSidebar, ZLayoutContent } from 'clover-ui'
```

## 用法

```vue
<ZLayout v-model:collapsed="collapsed" :header-height="52" :sidebar-width="200" :collapsed-width="72" fullHeight stickyHeader :contentPadding="16" scrollbar="none">
  <template #header="{ toggle, collapsed }">
    <ZLayoutHeader>
      <button class="btn" @click="toggle()">{{ collapsed ? '展开' : '折叠' }}</button>
    </ZLayoutHeader>
  </template>
  <template #sidebar="{ collapsed }">
    <ZLayoutSidebar :collapsed="collapsed">
      侧边内容
    </ZLayoutSidebar>
  </template>
  <ZLayoutContent>
    内容区域
  </ZLayoutContent>
</ZLayout>
```

## 属性

- `headerHeight` 顶部高度（px），默认 `52`
- `sidebarWidth` 侧边展开宽度（px），默认 `200`
- `collapsedWidth` 侧边折叠宽度（px），默认 `72`
- `collapsed` 是否折叠（受控）
- `fullHeight` 是否占满视口高度
- `stickyHeader` 头部吸顶
- `contentPadding` 内容区内边距（px），默认 `12`
- `scrollbar` 滚动条策略：`none|auto`

## 插槽

- `header` 参数：`{ toggle, collapsed }`
- `sidebar` 参数：`{ toggle, collapsed }`
- `default` 内容区

## 事件

- `update:collapsed` v-model 更新
- `toggle` 切换折叠事件（参数为当前状态）

