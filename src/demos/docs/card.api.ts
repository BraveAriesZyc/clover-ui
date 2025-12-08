export const attributes = [
  { name: 'bordered', description: '显示边框', type: 'boolean', values: '—', default: 'true' },
  { name: 'hoverable', description: '悬浮高亮', type: 'boolean', values: '—', default: 'false' },
  { name: 'padding', description: '内边距尺寸', type: "'sm' | 'md' | 'lg'", values: '—', default: 'md' },
  { name: 'shadow', description: '阴影等级', type: "'none' | 'sm' | 'md' | 'lg'", values: '—', default: 'none' },
  { name: 'clickable', description: '点击态样式', type: 'boolean', values: '—', default: 'false' },
]

export const slots = [
  { name: 'default', description: '卡片内容区域' },
]
