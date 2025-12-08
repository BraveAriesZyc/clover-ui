import { reactive } from 'vue'

export type Theme = 'light' | 'dark'

const state = reactive<{ theme: Theme }>({
  theme: (localStorage.getItem('theme') as Theme) || 'light',
})

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
}

function setCSSVars(vars: Record<string, string>) {
  const el = document.documentElement
  Object.keys(vars).forEach(k => el.style.setProperty(`--${k}`, vars[k] as any))
}

function hexToRgb(hex: string) {
  const s = hex.replace('#', '')
  const b = s.length === 3 ? s.split('').map(x => x + x).join('') : s
  const num = parseInt(b, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function mix(hex: string, other: string, ratio: number) {
  const a = hexToRgb(hex)
  const b = hexToRgb(other)
  const r = Math.round(a.r * (1 - ratio) + b.r * ratio)
  const g = Math.round(a.g * (1 - ratio) + b.g * ratio)
  const c = Math.round(a.b * (1 - ratio) + b.b * ratio)
  return `#${[r, g, c].map(v => v.toString(16).padStart(2, '0')).join('')}`
}

function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function useThemeStore() {
  function setTheme(t: Theme) {
    state.theme = t
    localStorage.setItem('theme', t)
    applyTheme(t)
  }
  function toggle() {
    setTheme(state.theme === 'light' ? 'dark' : 'light')
  }
  const cache = new Map<string, { hover: string; active: string; navHover: string; navActive: string }>()
  let timer: number | undefined
  let pending: string | undefined
  function setPrimary(hex: string) {
    pending = hex
    if (timer) return
    timer = (setTimeout(() => {
      timer = undefined
      const key = pending as string
      pending = undefined
      let c = cache.get(key)
      if (!c) {
        const hover = mix(key, '#ffffff', 0.2)
        const active = mix(key, '#000000', 0.15)
        const navHover = withAlpha(key, 0.08)
        const navActive = withAlpha(key, 0.12)
        c = { hover, active, navHover, navActive }
        cache.set(key, c)
      }
      setCSSVars({
        'color-primary': key,
        'color-primary-hover': c.hover,
        'color-primary-active': c.active,
        'nav-hover-bg': c.navHover,
        'nav-active-bg': c.navActive,
      })
    }, 120) as any)
  }
  applyTheme(state.theme)
  return { state, setTheme, toggle, setPrimary }
}
