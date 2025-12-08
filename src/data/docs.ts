export type DocItem = { key: string; title: string; short?: string }

const docs: DocItem[] = [
  { key: 'button', title: 'Button 按钮', short: 'Button' },
  { key: 'input', title: 'Input 输入框', short: 'Input' },
  { key: 'card', title: 'Card 卡片', short: 'Card' },
  { key: 'scroll-chips', title: 'ScrollChips 滚动标签', short: 'Chips' },
  { key: 'fixed-grid', title: 'ZFixedGrid 固定网格', short: 'Fixed' },
  { key: 'virtual-grid', title: 'ZVirtualGrid 虚拟网格', short: 'Virtual' },
  { key: 'loading', title: 'Loading 加载', short: 'Loading' },
  { key: 'icon', title: 'Icon 图标', short: 'Icon' },
  { key: 'svg', title: 'SVG 图标', short: 'SVG' },
]

export default docs
