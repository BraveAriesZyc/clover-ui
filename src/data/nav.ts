export type NavItem = { key: string; label: string; short?: string; icon?: string }
export type NavGroup = { name: string; icon?: string; items: NavItem[] }
import docs from './docs'

const groups: NavGroup[] = [
    {
        name: '指南',
        icon: 'bx:home',
        items: [{ key: '/home', label: '安装指南', short: 'Home', icon: 'bx:home' }],
    },
    {
        name: '布局',
        icon: 'bx:grid-alt',
        items: [
            {
                key: '/fixed-grid',
                label: 'ZFixedGrid 固定网格',
                short: 'FixedGrid',
                icon: 'bx:grid',
            },
            {
                key: '/virtual-grid',
                label: 'ZVirtualGrid 虚拟网格',
                short: 'VirtualGrid',
                icon: 'bx:grid-alt',
            },
            {
                key: '/app-layout',
                label: 'ZLayout 通用布局',
                short: 'Layout',
                icon: 'bx:layout',
            },
        ],
    },
    {
        name: '基础',
        icon: 'bx:category',
        items: [
            { key: '/card', label: 'Card 卡片', short: 'Card', icon: 'bx:shape-circle' },
            { key: '/button', label: 'Button 按钮', short: 'Btn', icon: 'bx:home' },
            { key: '/input', label: 'Input 输入框', short: 'Inp', icon: 'bx:edit' },
            {
                key: '/scroll-chips',
                label: 'ScrollChips 滚动标签',
                short: 'Chips',
                icon: 'bx:minus',
            },
        ],
    },
    {
        name: '图标',
        icon: 'bx:palette',
        items: [
            { key: '/icons', label: 'Icon 图标', short: 'Icon', icon: 'ri:palette-line' },
            { key: '/svg', label: 'SVG 图标', short: 'SVG', icon: 'ri:image-line' },
        ],
    },
    {
        name: '反馈',
        icon: 'bx:bell',
        items: [
            { key: '/message', label: 'Message 消息提示', short: 'Msg', icon: 'bx:message' },
            { key: '/alert', label: 'Alert 警告提示', short: 'Alert', icon: 'bx:error' },
            { key: '/toast', label: 'Toast 轻提示', short: 'Toast', icon: 'bx:info-circle' },
            {
                key: '/loading',
                label: 'Loading 加载',
                short: 'Load',
                icon: 'svg-spinners:90-ring-with-bg',
            },
        ],
    },
    {
        name: '文档',
        icon: 'bx:file',
        items: docs.map((d) => ({
            key: `/docs/${d.key}`,
            label: `${d.title} 文档`,
            short: d.short ?? d.key,
            icon: 'bx:file',
        })),
    },

]

export default groups
