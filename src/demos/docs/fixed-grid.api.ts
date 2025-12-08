export const attributes = [
  { name: 'items', description: '数据项集合', type: 'any[]', values: '—', default: '[]' },
  { name: 'columns', description: '固定列数', type: 'number', values: '—', default: '—' },
  { name: 'gap', description: '单元格间距(px)', type: 'number', values: '—', default: '8' },
  { name: 'span', description: '跨列数或函数', type: 'number | (item, index) => number', values: '—', default: '1' },
]

export const slots = [
  { name: 'cell', description: '单元格插槽，参数：{ item, index }' },
]
