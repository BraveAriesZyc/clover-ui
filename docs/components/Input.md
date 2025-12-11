# Input 输入框

## 安装

```ts
import { ZInput } from 'clover-ui'
```

## 用法

```vue
<ZInput v-model="value" placeholder="请输入" />
<ZInput v-model="value" size="sm" />
<ZInput v-model="value" :disabled="true" />
```

## 属性概览

- `modelValue` 绑定值（`v-model`）
- `placeholder` 占位文本
- `size` 尺寸：`sm|md|lg`，默认 `md`
- `disabled` 是否禁用，默认 `false`

