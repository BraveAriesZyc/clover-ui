# Message 消息提示

## 安装

```ts
import { ZMessage, message, openMessage } from 'clover-ui'
```

## 函数触发

```ts
message('这是一条普通消息')
message.success('操作成功')
message.warning('注意事项')
message.error('操作失败')
```

## 对象方式

```ts
const h = message({ text: '手动关闭的消息', type: 'warning', duration: 0, showClose: true })
// 手动关闭
h.close()
```

## 选项

- `text` 文本内容
- `type` 类型：`success|warning|info|error`，默认 `info`
- `duration` 自动关闭时间（ms），`0` 表示不自动关闭
- `showClose` 是否显示关闭按钮

