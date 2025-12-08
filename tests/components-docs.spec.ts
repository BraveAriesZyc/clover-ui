import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '..')
const pkgComponentsDir = path.join(root, 'packages', 'components')
const demosDir = path.join(root, 'src', 'demos')
const docsDir = path.join(root, 'src', 'demos', 'docs')

function readAllVueFiles(dir: string): string[] {
  const res: string[] = []
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()!
    const entries = fs.readdirSync(d, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile() && p.endsWith('.vue')) res.push(p)
    }
  }
  return res
}

function hasTagInFiles(tag: string, files: string[]): boolean {
  const re = new RegExp(`<${tag}(\s|>)`)
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf-8')
    if (re.test(content)) return true
  }
  return false
}

describe('Components must have demo and docs', () => {
  const components = fs.readdirSync(pkgComponentsDir).filter(n => !n.endsWith('.md'))
  const vueFiles = readAllVueFiles(demosDir)

  const mapping: Record<string, { tags: string[]; doc: string | string[] }> = {
    'button': { tags: ['ZButton'], doc: 'button.api.ts' },
    'input': { tags: ['ZInput'], doc: 'input.api.ts' },
    'card': { tags: ['ZCard'], doc: 'card.api.ts' },
    'scroll-chips': { tags: ['ZScrollChips'], doc: 'scroll-chips.api.ts' },
    'fixed-grid': { tags: ['ZFixedGrid'], doc: 'fixed-grid.api.ts' },
    'virtual-grid': { tags: ['ZVirtualGrid'], doc: 'virtual-grid.api.ts' },
    'loading': { tags: ['ZLoading'], doc: 'loading.api.ts' },
    'icon': { tags: ['ZIcon', 'Icon', 'SvgIcon'], doc: 'icon.api.ts' },
  }

  for (const name of components) {
    it(`${name} has docs`, () => {
      const map = mapping[name]
      expect(map, `missing mapping for component ${name}`).toBeTruthy()
      const docs = Array.isArray(map.doc) ? map.doc : [map.doc]
      for (const d of docs) {
        const docPath = path.join(docsDir, d)
        const ok = fs.existsSync(docPath)
        expect(ok, `expected docs at ${docPath}`).toBe(true)
      }
    })

    it(`${name} has demo`, () => {
      const map = mapping[name]
      expect(map, `missing mapping for component ${name}`).toBeTruthy()
      const hasAny = map.tags.some(tag => hasTagInFiles(tag, vueFiles))
      expect(hasAny, `expected demo using tags ${map.tags.join(', ')} in ${demosDir}`).toBe(true)
    })
  }
})

