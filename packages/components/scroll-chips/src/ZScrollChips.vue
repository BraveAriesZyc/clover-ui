<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue'

const props = defineProps<{
  items: Array<string | { label: string; value: string }>
  modelValue?: string
  buttonSize?: Size
  activeVariant?: Variant
  inactiveVariant?: Variant
  scrollAmount?: number
  centerOnSelect?: boolean
  smoothScroll?: boolean
  allowWheelScroll?: boolean
  markerDirection?: 'lr' | 'ud'
  stickyTop?: number
  snapCenter?: boolean
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void; (e: 'change', v: string): void }>()

const selected = computed<string | undefined>({
  get: () => props.modelValue,
  set: v => { if (v != null) { emit('update:modelValue', v); emit('change', v) } }
})

function getLabel(it: string | { label: string; value: string }) { return typeof it === 'string' ? it : it.label }
function getValue(it: string | { label: string; value: string }) { return typeof it === 'string' ? it : it.value }

const setsEl = ref<HTMLElement | null>(null)
const canLeft = ref(false)
const canRight = ref(false)
const isCentering = ref(false)
function updateArrows() {
  const el = setsEl.value
  if (!el) { canLeft.value = false; canRight.value = false; return }
  const max = el.scrollWidth - el.clientWidth
  canLeft.value = el.scrollLeft > 0
  canRight.value = el.scrollLeft < Math.max(0, max - 1)
}
function scroll(dir: 'left' | 'right') {
  const el = setsEl.value
  const vals = props.items.map(it => getValue(it))
  if (vals.length === 0) return
  const curr = selected.value ?? vals[0]!
  let idx = vals.indexOf(curr)
  if (idx < 0) idx = 0
  idx = dir === 'left' ? Math.max(0, idx - 1) : Math.min(vals.length - 1, idx + 1)
  selected.value = vals[idx]
  if (!props.centerOnSelect && el) {
    const delta = dir === 'left' ? -(props.scrollAmount ?? 240) : (props.scrollAmount ?? 240)
    el.scrollBy({ left: delta, behavior: props.smoothScroll === false ? 'auto' : 'smooth' })
  }
}

onMounted(() => {
  const el = setsEl.value
  updateArrows()
  let rafId: number | null = null
  const schedule = () => {
    if (rafId != null) return
    rafId = requestAnimationFrame(() => { updateArrows(); rafId = null })
  }
  const onScroll = () => schedule()
  const onResize = () => schedule()
  el?.addEventListener('scroll', onScroll, { passive: true })
  const onWheel = (e: WheelEvent) => {
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 0) return
    const delta = (e.deltaX || e.deltaY)
    if (props.allowWheelScroll === false) {
      e.preventDefault()
      return
    }
    if (delta) {
      e.preventDefault()
      el.scrollBy({ left: delta, behavior: props.smoothScroll === false ? 'auto' : 'smooth' })
      schedule()
    }
  }
  el?.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('resize', onResize, { passive: true })
  onUnmounted(() => {
    el?.removeEventListener('scroll', onScroll)
    el?.removeEventListener('wheel', onWheel)
    window.removeEventListener('resize', onResize)
  })
  nextTick(() => updateArrows())
})

watch(() => props.items, () => updateArrows(), { deep: true })
watch(selected, async (v) => {
  if (!props.centerOnSelect) return
  if (!v) return
  await nextTick()
  const sc = setsEl.value
  if (!sc) return
  const btn = sc.querySelector(`[data-value="${v}"]`) as HTMLElement | null
  if (!btn) return
  isCentering.value = true
  const target = btn.offsetLeft - Math.max(0, (sc.clientWidth - btn.clientWidth) / 2)
  const max = Math.max(0, sc.scrollWidth - sc.clientWidth)
  const clamped = Math.min(Math.max(0, target), max)
  sc.scrollTo({ left: clamped, behavior: props.smoothScroll === false ? 'auto' : 'smooth' })
  const delay = props.smoothScroll === false ? 0 : 220
  setTimeout(() => { isCentering.value = false }, delay)
})
</script>
 

<template>
  <div class="z-scroll-chips" :style="props.stickyTop != null ? { position: 'sticky', top: (props.stickyTop || 0) + 'px', zIndex: 5, contain: 'unset' } : undefined">
    <button class="z-scroll-chips__btn" :data-show="canLeft ? 'true' : 'false'" @click="scroll('left')">
      <ZIcon :name="(props.markerDirection ?? 'lr') === 'ud' ? 'bx:chevron-up' : 'bx:chevron-left'" />
    </button>
    <div class="z-scroll-chips__scroll" :class="{ 'is-snap': props.snapCenter && !isCentering }" ref="setsEl">
      <div class="z-scroll-chips__items">
        <ZButton
          v-for="it in props.items"
          :key="getValue(it)"
          :size="props.buttonSize ?? 'sm'"
          :variant="getValue(it) === selected ? (props.activeVariant ?? 'primary') : (props.inactiveVariant ?? 'default')"
          :data-value="getValue(it)"
          @click="selected = getValue(it)"
        >{{ getLabel(it) }}</ZButton>
      </div>
    </div>
    <button class="z-scroll-chips__btn" :data-show="canRight ? 'true' : 'false'" @click="scroll('right')">
      <ZIcon :name="(props.markerDirection ?? 'lr') === 'ud' ? 'bx:chevron-down' : 'bx:chevron-right'" />
    </button>
  </div>
</template>
