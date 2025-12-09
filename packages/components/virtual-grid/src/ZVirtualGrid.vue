<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

    const props = defineProps<{
        items: any[]
        itemWidth: number
        itemHeight: number
        gap?: number
        bufferRows?: number
        showMarkers?: boolean
        scrollStepRows?: number
        fitWidth?: boolean
        edgeGutters?: boolean
        columns?: number
    }>()

    const gap = computed(() => props.gap ?? 8)
    const fit = computed(() => props.fitWidth !== false)
    const bufferRows = computed(() => props.bufferRows ?? 2)
    const root = ref<HTMLElement | null>(null)
    const scrollTop = ref(0)
    const viewportH = ref(0)
    const viewportW = ref(0)
    const canUp = ref(false)
    const canDown = ref(false)

    function onScroll() {
        if (!root.value) return
        scrollTop.value = root.value.scrollTop
        const max = Math.max(0, contentH.value - viewportH.value)
        canUp.value = scrollTop.value > 0
        canDown.value = scrollTop.value < max - 1
    }

    function measure() {
        const el = root.value
        if (!el) return
        viewportH.value = el.clientHeight
        viewportW.value = el.offsetWidth
    }

    onMounted(() => {
        measure()
        const el = root.value
        const onResize = () => measure()
        el?.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
        onUnmounted(() => {
            el?.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        })
        onScroll()
    })

    watch(
        () => props.items.length,
        () => measure(),
    )

    const columns = computed(() => {
        const fixed = Number((props as any).columns ?? 0) || 0
        if (fixed > 0) return Math.max(1, Math.floor(fixed))
        const w = viewportW.value
        if (fit.value) {
            return Math.max(1, Math.floor(w / props.itemWidth))
        }
        const cell = props.itemWidth + gap.value
        return Math.max(1, Math.floor((w + gap.value) / cell))
    })

    const edge = computed(() => props.edgeGutters === true)
    const usedGap = computed(() => {
        const w = viewportW.value
        const cols = columns.value
        const fixed = Number((props as any).columns ?? 0) || 0
        if (fixed > 0) return gap.value
        if (!fit.value || cols <= 1) return gap.value
        const gutters = edge.value ? cols + 1 : cols - 1
        const g = (w - cols * props.itemWidth) / Math.max(1, gutters)
        return g >= 0 ? g : gap.value
    })

    const cellWidth = computed(() => {
        const w = viewportW.value
        const cols = columns.value
        const fixed = Number((props as any).columns ?? 0) || 0
        if (fixed > 0 && w > 0) {
            const gutters = edge.value ? cols + 1 : cols - 1
            const totalGaps = Math.max(0, gutters) * gap.value
            const width = (w - totalGaps) / Math.max(1, cols)
            return width > 1 ? width : 1
        }
        return props.itemWidth
    })

    const totalRows = computed(() => Math.ceil(props.items.length / columns.value))
    const rowHeight = computed(() => props.itemHeight + gap.value)
    const contentH = computed(() => totalRows.value * rowHeight.value)

    const visibleRange = computed(() => {
        const startRow = Math.max(
            0,
            Math.floor(scrollTop.value / rowHeight.value) - bufferRows.value,
        )
        const rowsInView = Math.ceil(viewportH.value / rowHeight.value) + bufferRows.value * 2
        const endRow = Math.min(totalRows.value, startRow + rowsInView)
        const startIndex = startRow * columns.value
        const endIndex = Math.min(props.items.length, endRow * columns.value)
        return { startIndex, endIndex }
    })

    const cells = computed(() => {
        const res: Array<{ i: number; x: number; y: number; item: any }> = []
        const { startIndex, endIndex } = visibleRange.value
        for (let i = startIndex; i < endIndex; i++) {
            const col = i % columns.value
            const row = Math.floor(i / columns.value)
            const x = edge.value
                ? col * cellWidth.value + (col + 1) * usedGap.value
                : col * (cellWidth.value + usedGap.value)
            const y = row * (props.itemHeight + gap.value)
            res.push({ i, x, y, item: props.items[i] })
        }
        return res
    })

    function scrollBy(dir: 'up' | 'down') {
        const el = root.value
        if (!el) return
        const step = (props.scrollStepRows ?? 3) * rowHeight.value
        const delta = dir === 'up' ? -step : step
        el.scrollBy({ top: delta, behavior: 'smooth' })
    }
</script>

<template>
    <div class="z-virtual-grid" ref="root">
        <div class="z-virtual-grid__content" :style="{ height: contentH + 'px' }">
            <div
                v-for="c in cells"
                :key="c.i"
                class="z-virtual-grid__cell"
                :style="{
                    transform: `translate(${c.x}px, ${c.y}px)`,
                    width: cellWidth + 'px',
                    height: props.itemHeight + 'px',
                }"
            >
                <slot name="cell" :item="c.item" :index="c.i"></slot>
            </div>
        </div>
        <div v-if="props.showMarkers !== false" class="z-virtual-grid__markers">
            <button
                class="z-virtual-grid__marker"
                :data-show="canUp ? 'true' : 'false'"
                @click="scrollBy('up')"
            >
                <ZIcon name="bx:chevron-up" />
            </button>
            <button
                class="z-virtual-grid__marker"
                :data-show="canDown ? 'true' : 'false'"
                @click="scrollBy('down')"
            >
                <ZIcon name="bx:chevron-down" />
            </button>
        </div>
    </div>
</template>
