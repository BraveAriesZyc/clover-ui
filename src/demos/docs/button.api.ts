export const attributes = [
    {
        name: 'variant',
        description: '视觉风格变体',
        type: "'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'",
        values: '—',
        default: 'primary',
    },
    {
        name: 'size',
        description: '按钮尺寸',
        type: "'sm' | 'md' | 'lg'",
        values: '—',
        default: 'md',
    },
    { name: 'disabled', description: '是否禁用', type: 'boolean', values: '—', default: 'false' },
    { name: 'loading', description: '加载中状态', type: 'boolean', values: '—', default: 'false' },
    {
        name: 'nativeType',
        description: '原生按钮类型',
        type: "'button' | 'submit' | 'reset'",
        values: '—',
        default: 'button',
    },
]

export const events = [
    { name: 'click', description: '点击触发（禁用或加载中不触发）', parameters: 'MouseEvent' },
]

export const slots = [
    { name: 'icon', description: '图标插槽' },
    { name: 'default', description: '按钮文本内容' },
]
