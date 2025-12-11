# ZFixedGrid 固定网格

## 安装

```ts
import { ZFixedGrid } from 'clover-ui'
```

## 用法

```vue
<ZFixedGrid :items="items" :columns="12" :gap="8">
  <template #cell="{ item }">
    <div class="cell">#{{ item }}</div>
  </template>
</ZFixedGrid>
```

## 属性概览

- `items` 数据数组
- `columns` 列数
- `gap` 网格间距（px）

