# Button 按钮

## 安装

```ts
import { ZButton } from 'clover-ui'
```

## 用法

```vue
<ZButton variant="primary">主按钮</ZButton>
<ZButton variant="default">默认按钮</ZButton>
<ZButton variant="danger">危险</ZButton>
<ZButton size="sm">小号</ZButton>
<ZButton :disabled="true">禁用</ZButton>
<ZButton :loading="true">加载中</ZButton>
```

## 插槽

- `default` 按钮文本内容
- `icon` 左侧图标

## 属性概览

- `variant` 按钮风格：`primary|default|danger|success|warning|info|secondary|blue`
- `size` 尺寸：`sm|md|lg`，默认 `md`
- `disabled` 是否禁用，默认 `false`
- `loading` 是否加载中，默认 `false`

