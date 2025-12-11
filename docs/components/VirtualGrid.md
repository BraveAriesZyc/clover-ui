# ZVirtualGrid 虚拟网格

## 安装

```ts
import { ZVirtualGrid } from 'clover-ui'
```

## 用法

```vue
<ZVirtualGrid :items="items" :item-width="160" :item-height="64" :gap="8">
  <template #cell="{ item }">
    <div class="cell">#{{ item }}</div>
  </template>
</ZVirtualGrid>
```

## 属性概览

- `items` 数据数组
- `item-width` 单元宽度（px）
- `item-height` 单元高度（px）
- `gap` 网格间距（px）

