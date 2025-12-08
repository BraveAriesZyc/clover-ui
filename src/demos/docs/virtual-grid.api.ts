export const attributes = [
  { name: 'items', description: '数据项集合', type: 'any[]', values: '—', default: '[]' },
  { name: 'itemWidth', description: '单元格宽度(px)', type: 'number', values: '—', default: '—' },
  { name: 'itemHeight', description: '单元格高度(px)', type: 'number', values: '—', default: '—' },
  { name: 'gap', description: '单元格间距', type: 'number', values: '—', default: '8' },
  { name: 'bufferRows', description: '缓冲行数', type: 'number', values: '—', default: '2' },
  { name: 'showMarkers', description: '显示上下滚动标记', type: 'boolean', values: '—', default: 'true' },
  { name: 'scrollStepRows', description: '标记按钮滚动行数', type: 'number', values: '—', default: '3' },
  { name: 'fitWidth', description: '自适应容器宽度', type: 'boolean', values: '—', default: 'true' },
  { name: 'edgeGutters', description: '两侧边距', type: 'boolean', values: '—', default: 'false' },
  { name: 'columns', description: '固定列数', type: 'number', values: '—', default: '—' },
]

export const slots = [
  { name: 'cell', description: '单元格插槽，参数：{ item, index }' },
]
