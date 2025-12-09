export const attributes = [
    { name: 'v-model', description: '开关', type: 'boolean', values: '—', default: 'false' },
    { name: 'text', description: '文本内容', type: 'string', values: '—', default: '"加载中..."' },
    { name: 'fullscreen', description: '全屏遮罩', type: 'boolean', values: '—', default: 'false' },
    { name: 'mask', description: '半透明遮罩', type: 'boolean', values: '—', default: 'true' },
    {
        name: 'variant',
        description: '颜色主题',
        type: "'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'",
        values: '—',
        default: 'primary',
    },
]

export const functions = [
    {
        name: 'openLoading(options)',
        description: '开启加载并返回关闭句柄',
        parameters: '{ text?, mask?, variant?, duration?, target? }',
        returns: '{ close(): void }',
    },
    {
        name: 'useLoading(vNode?, config?)',
        description: '组合式加载控制',
        parameters:
            '{ text?, mask?, variant?, target?, autoCloseMs?, lazy?, lazyDelay?, opacity? }',
        returns: '{ startLoading(): void; stopLoading(): Promise<void> }',
    },
]

export const configOpenLoading = [
    {
        name: 'text',
        description: '加载文本；用于提示当前状态',
        type: 'string',
        default: '"加载中..."',
    },
    {
        name: 'mask',
        description: '是否显示遮罩层；true 显示半透明背景',
        type: 'boolean',
        default: 'true',
    },
    {
        name: 'variant',
        description: '主题颜色；影响 spinner 和文本颜色',
        type: "'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'",
        default: 'primary',
    },
    {
        name: 'duration',
        description: '自动关闭毫秒数；设置后到时自动关闭',
        type: 'number',
        default: '—',
    },
    {
        name: 'target',
        description: '局部容器元素；不传则渲染到 body 全屏',
        type: 'HTMLElement',
        default: '—',
    },
]

export const configUseLoading = [
    {
        name: 'text',
        description: '加载文本；与组件 `text` 一致',
        type: 'string',
        default: '"加载中..."',
    },
    { name: 'mask', description: '是否显示遮罩层', type: 'boolean', default: 'true' },
    {
        name: 'variant',
        description: '主题颜色',
        type: "'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'",
        default: 'primary',
    },
    {
        name: 'target',
        description: '局部容器元素；用于局部加载覆盖',
        type: 'HTMLElement',
        default: '—',
    },
    {
        name: 'autoCloseMs',
        description: '自动关闭毫秒数；到时调用 stopLoading()',
        type: 'number',
        default: '—',
    },
    {
        name: 'lazy',
        description: '延迟启动；短时间点击抖动时更平滑',
        type: 'boolean',
        default: 'true',
    },
    { name: 'lazyDelay', description: '延迟启动时间；单位毫秒', type: 'number', default: '100' },
    {
        name: 'pointerEvents',
        description: '是否允许指针事件；false 可穿透点击',
        type: 'boolean',
        default: 'true',
    },
    { name: 'opacity.startOpacity', description: '入场初始透明度', type: 'string', default: '0.3' },
    { name: 'opacity.opacity', description: '入场目标透明度', type: 'string', default: '0.95' },
    { name: 'opacity.stopOpacity', description: '退场目标透明度', type: 'string', default: '0' },
]
