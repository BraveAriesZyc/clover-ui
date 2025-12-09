export const attributes = [
    {
        name: 'items',
        description: '标签项集合',
        type: 'Array<string | { label: string; value: string }>',
        values: '—',
        default: '[]',
    },
    {
        name: 'modelValue',
        description: '选中值（v-model）',
        type: 'string',
        values: '—',
        default: '—',
    },
    {
        name: 'buttonSize',
        description: '按钮尺寸',
        type: "'sm' | 'md' | 'lg'",
        values: '—',
        default: 'sm',
    },
    {
        name: 'activeVariant',
        description: '选中项按钮风格',
        type: '见 Button 变体',
        values: '—',
        default: 'primary',
    },
    {
        name: 'inactiveVariant',
        description: '未选中项按钮风格',
        type: '见 Button 变体',
        values: '—',
        default: 'default',
    },
    {
        name: 'scrollAmount',
        description: '箭头滚动距离(px)',
        type: 'number',
        values: '—',
        default: '240',
    },
    {
        name: 'centerOnSelect',
        description: '选中后居中显示',
        type: 'boolean',
        values: '—',
        default: 'false',
    },
    {
        name: 'smoothScroll',
        description: '平滑滚动',
        type: 'boolean',
        values: '—',
        default: 'true',
    },
    {
        name: 'allowWheelScroll',
        description: '允许滚轮滚动',
        type: 'boolean',
        values: '—',
        default: 'true',
    },
    {
        name: 'markerDirection',
        description: '箭头方向',
        type: "'lr' | 'ud'",
        values: '—',
        default: 'lr',
    },
    { name: 'stickyTop', description: '吸顶像素值', type: 'number', values: '—', default: '—' },
    {
        name: 'snapCenter',
        description: '开启滚动吸附到中间',
        type: 'boolean',
        values: '—',
        default: 'false',
    },
]

export const events = [
    { name: 'update:modelValue', description: '选中值更新', parameters: 'string' },
    { name: 'change', description: '选中变更回调', parameters: 'string' },
]

export const types = [
    { name: 'Size', definition: "'sm' | 'md' | 'lg'", usage: '按钮尺寸枚举，控制高度/字号' },
    {
        name: 'Variant',
        definition:
            "'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'",
        usage: '按钮主题枚举，继承 Button 的变体',
    },
    {
        name: 'ChipItem',
        definition: 'string | { label: string; value: string }',
        usage: '标签项类型；string 直接作为 label 与 value，或对象形式',
    },
    {
        name: 'MarkerDirection',
        definition: "'lr' | 'ud'",
        usage: '左右或上下方向；控制箭头图标方向',
    },
]
