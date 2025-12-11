import { reactive } from 'vue'
import { createVNode, render } from 'vue'
import ZMessageVue, { type MessageItem } from './ZMessage.vue'

type MessageOptions = {
  text: string
  type?: 'success' | 'warning' | 'info' | 'error'
  duration?: number
  showClose?: boolean
}

let mounted = false
const list = reactive<MessageItem[]>([])
const timers: Record<number, any> = {}
let seed = 1

function ensureMount() {
  if (mounted) return
  const container = document.createElement('div')
  document.body.appendChild(container)
  const vnode = createVNode(ZMessageVue, { list, onClose: (id: number) => closeById(id) })
  render(vnode, container)
  mounted = true
}

export function openMessage(options: string | MessageOptions) {
  ensureMount()
  const id = seed++
  const opt: MessageOptions = typeof options === 'string' ? { text: options } : options
  const item: MessageItem = {
    id,
    text: opt.text,
    type: opt.type || 'info',
    duration: opt.duration ?? 3000,
    showClose: opt.showClose ?? false,
  }
  list.push(item)
  if (item.duration! > 0) timers[id] = setTimeout(() => closeById(id), item.duration)
  const close = () => closeById(id)
  return { close }
}

function closeById(id: number) {
  const idx = list.findIndex((x) => x.id === id)
  if (idx >= 0) list.splice(idx, 1)
  const t = timers[id]
  if (t) { clearTimeout(t); delete timers[id] }
}

export const message = Object.assign(openMessage, {
  success(text: string, duration?: number) {
    return openMessage({ text, type: 'success', duration })
  },
  warning(text: string, duration?: number) {
    return openMessage({ text, type: 'warning', duration })
  },
  info(text: string, duration?: number) {
    return openMessage({ text, type: 'info', duration })
  },
  error(text: string, duration?: number) {
    return openMessage({ text, type: 'error', duration })
  },
})
