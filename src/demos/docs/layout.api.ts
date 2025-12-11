export const attributes = [
    { name: 'headerHeight', type: 'number', default: 52, desc: '顶部区域高度，单位 px' },
    { name: 'sidebarWidth', type: 'number', default: 200, desc: '侧边栏展开时宽度，单位 px' },
    { name: 'collapsedWidth', type: 'number', default: 72, desc: '侧边栏折叠时宽度，单位 px' },
    { name: 'collapsed', type: 'boolean', default: false, desc: '是否折叠侧边栏（受控）' },
    { name: 'fullHeight', type: 'boolean', default: false, desc: '是否设置为视口全高' },
    { name: 'stickyHeader', type: 'boolean', default: false, desc: '顶部吸顶' },
    { name: 'contentPadding', type: 'number', default: 12, desc: '内容区内边距，单位 px' },
    { name: 'scrollbar', type: '"none" | "auto"', default: 'auto', desc: '内容区滚动条策略' },
]

export const slots = [
    { name: 'header', desc: '头部区域，插槽参数：{ toggle, collapsed }' },
    { name: 'sidebar', desc: '侧边区域，插槽参数：{ toggle, collapsed }' },
    { name: 'default', desc: '内容区域' },
]

export const events = [
    { name: 'update:collapsed', desc: '折叠状态更新（用于 v-model）' },
    { name: 'toggle', desc: '折叠状态切换事件，参数为当前状态' },
]
