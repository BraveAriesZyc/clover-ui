export const attributes = [
    {
        name: 'modelValue',
        description: '绑定值',
        type: 'string | number',
        values: '—',
        default: "''",
    },
    { name: 'placeholder', description: '占位文本', type: 'string', values: '—', default: "''" },
    { name: 'disabled', description: '是否禁用', type: 'boolean', values: '—', default: 'false' },
    { name: 'readonly', description: '只读模式', type: 'boolean', values: '—', default: 'false' },
    {
        name: 'type',
        description: '原生输入类型',
        type: 'string',
        values: 'text 等',
        default: 'text',
    },
    { name: 'maxlength', description: '最大长度', type: 'number', values: '—', default: '—' },
    {
        name: 'invalid',
        description: '非法状态样式',
        type: 'boolean',
        values: '—',
        default: 'false',
    },
    { name: 'name', description: '原生 name', type: 'string', values: '—', default: '—' },
    { name: 'id', description: '原生 id', type: 'string', values: '—', default: '—' },
]

export const events = [
    { name: 'update:modelValue', description: '输入时更新绑定值', parameters: 'string | number' },
    { name: 'input', description: '输入事件', parameters: 'string | number' },
    { name: 'change', description: '更改事件', parameters: 'string | number' },
    { name: 'focus', description: '聚焦事件', parameters: 'FocusEvent' },
    { name: 'blur', description: '失焦事件', parameters: 'FocusEvent' },
]

export const slots = [
    { name: 'prefix', description: '前缀区域' },
    { name: 'suffix', description: '后缀区域' },
]

export const types = [
    {
        name: 'ValueType',
        definition: 'string | number',
        usage: '输入框绑定值的类型；同时用于事件回调参数',
    },
    {
        name: 'FocusEvent',
        definition: 'DOM FocusEvent',
        usage: '原生焦点事件类型；用于 focus/blur 回调参数',
    },
]
