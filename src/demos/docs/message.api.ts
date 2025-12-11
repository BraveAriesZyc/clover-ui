export const functions = [
    { name: 'message(text)', desc: '以 info 类型显示一条消息' },
    { name: 'message.success(text, duration?)', desc: '显示成功类型消息' },
    { name: 'message.warning(text, duration?)', desc: '显示警告类型消息' },
    { name: 'message.error(text, duration?)', desc: '显示错误类型消息' },
    {
        name: 'message(options)',
        desc: '以对象方式显示消息，支持更多配置，返回 { close }',
    },
]

export const types = [
    {
        name: 'MessageOptions',
        type: '{ text: string; type?: "success" | "warning" | "info" | "error"; duration?: number; showClose?: boolean }',
    },
]
