# Loading 加载

## 安装

```ts
import { ZLoading, openLoading, useLoading } from 'clover-ui'
```

## 组件用法

```vue
<ZLoading :active="loading" text="加载中..." />
```

## 服务用法

```ts
const h = openLoading({ text: '加载中...', fullscreen: true })
// ...
h.close()
```

## 组合式用法

```ts
const { show, close } = useLoading({ target: '#app' })
show('加载中...')
close()
```

