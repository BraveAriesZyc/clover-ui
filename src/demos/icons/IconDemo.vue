<script setup lang="ts">
import {ref, computed, watchEffect, onMounted, watch} from 'vue'
import * as IconifyVue from '@iconify/vue'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()

const setParam = computed(() => (route.params.set as string | undefined) || '')
const selectedSet = computed<string | undefined>({
  get: () => setParam.value || undefined,
  set: v => { if (v) goto(v) }
})
const search = ref('')
const searchTerm = ref('')
let searchTimer: any = null
watch(search, v => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { searchTerm.value = v }, 120)
})
const loading = ref(false)
const iconSet = ref<any>(null)
const allIcons = ref<string[]>([])
const colorChoice = ref<'inherit'|'text'|'muted'|'primary'|'success'|'warning'|'danger'|'info'|'secondary'|'blue'>('inherit')
const colorItems = [
  { label: '继承', value: 'inherit' },
  { label: '跟随文本', value: 'text' },
  { label: '淡化', value: 'muted' },
  { label: '主色', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info' },
  { label: '次级', value: 'secondary' },
  { label: '蓝色', value: 'blue' }
]
const colorVar = computed(() => {
  if (colorChoice.value === 'inherit') return undefined
  const key = colorChoice.value === 'text' ? 'text' : colorChoice.value
  return `var(--color-${key})`
})
const page = ref(1)
const pageSize = ref(240)

const loaders: Record<string, () => Promise<any>> = {
  'bi': () => import('@iconify/json/json/bi.json'),
  'bx': () => import('@iconify/json/json/bx.json'),
  'ri': () => import('@iconify/json/json/ri.json'),
  'mdi': () => import('@iconify/json/json/mdi.json'),
  'fa6-solid': () => import('@iconify/json/json/fa6-solid.json'),
  'academicons': () => import('@iconify/json/json/academicons.json'),
  'fa6-regular': () => import('@iconify/json/json/fa6-regular.json'),
  'fa6-brands': () => import('@iconify/json/json/fa6-brands.json'),
  'akar-icons': () => import('@iconify/json/json/akar-icons.json'),
  'ant-design': () => import('@iconify/json/json/ant-design.json'),
  'arcticons': () => import('@iconify/json/json/arcticons.json'),
  'basil': () => import('@iconify/json/json/basil.json'),
  'bitcoin-icons': () => import('@iconify/json/json/bitcoin-icons.json'),
  'bpmn': () => import('@iconify/json/json/bpmn.json'),
  'brandico': () => import('@iconify/json/json/brandico.json'),
  'bubbles': () => import('@iconify/json/json/bubbles.json'),
  'bxl': () => import('@iconify/json/json/bxl.json'),
  'bxs': () => import('@iconify/json/json/bxs.json'),
  'bytesize': () => import('@iconify/json/json/bytesize.json'),
  'carbon': () => import('@iconify/json/json/carbon.json'),
  'catppuccin': () => import('@iconify/json/json/catppuccin.json'),
  'cbi': () => import('@iconify/json/json/cbi.json'),
  'charm': () => import('@iconify/json/json/charm.json'),
  'ci': () => import('@iconify/json/json/ci.json'),
  'cib': () => import('@iconify/json/json/cib.json'),
  'cif': () => import('@iconify/json/json/cif.json'),
  'cil': () => import('@iconify/json/json/cil.json'),
  'circle-flags': () => import('@iconify/json/json/circle-flags.json'),
  'circum': () => import('@iconify/json/json/circum.json'),
  'clarity': () => import('@iconify/json/json/clarity.json'),
  'codex': () => import('@iconify/json/json/codex.json'),
  'codicon': () => import('@iconify/json/json/codicon.json'),
  'covid': () => import('@iconify/json/json/covid.json'),
  'cryptocurrency-color': () => import('@iconify/json/json/cryptocurrency-color.json'),
  'cryptocurrency': () => import('@iconify/json/json/cryptocurrency.json'),
  'cuida': () => import('@iconify/json/json/cuida.json'),
  'dashicons': () => import('@iconify/json/json/dashicons.json'),
  'devicon-line': () => import('@iconify/json/json/devicon-line.json'),
  'devicon-original': () => import('@iconify/json/json/devicon-original.json'),
  'devicon-plain': () => import('@iconify/json/json/devicon-plain.json'),
  'devicon': () => import('@iconify/json/json/devicon.json'),
  'dinkie-icons': () => import('@iconify/json/json/dinkie-icons.json'),
  'duo-icons': () => import('@iconify/json/json/duo-icons.json'),
  'ei': () => import('@iconify/json/json/ei.json'),
  'el': () => import('@iconify/json/json/el.json'),
  'emblemicons': () => import('@iconify/json/json/emblemicons.json'),
  'emojione-monotone': () => import('@iconify/json/json/emojione-monotone.json'),
  'emojione-v1': () => import('@iconify/json/json/emojione-v1.json'),
  'emojione': () => import('@iconify/json/json/emojione.json'),
  'entypo-social': () => import('@iconify/json/json/entypo-social.json'),
  'entypo': () => import('@iconify/json/json/entypo.json'),
  'eos-icons': () => import('@iconify/json/json/eos-icons.json'),
  'ep': () => import('@iconify/json/json/ep.json'),
  'et': () => import('@iconify/json/json/et.json'),
  'eva': () => import('@iconify/json/json/eva.json'),
  'f7': () => import('@iconify/json/json/f7.json'),
  'fa-brands': () => import('@iconify/json/json/fa-brands.json'),
  'fa-regular': () => import('@iconify/json/json/fa-regular.json'),
  'fa-solid': () => import('@iconify/json/json/fa-solid.json'),
  'fa': () => import('@iconify/json/json/fa.json'),
  'fa7-brands': () => import('@iconify/json/json/fa7-brands.json'),
  'fa7-regular': () => import('@iconify/json/json/fa7-regular.json'),
  'fa7-solid': () => import('@iconify/json/json/fa7-solid.json'),
  'fad': () => import('@iconify/json/json/fad.json'),
  'famicons': () => import('@iconify/json/json/famicons.json'),
  'fe': () => import('@iconify/json/json/fe.json'),
  'feather': () => import('@iconify/json/json/feather.json'),
  'file-icons': () => import('@iconify/json/json/file-icons.json'),
  'flag': () => import('@iconify/json/json/flag.json'),
  'flagpack': () => import('@iconify/json/json/flagpack.json'),
  'flat-color-icons': () => import('@iconify/json/json/flat-color-icons.json'),
  'flat-ui': () => import('@iconify/json/json/flat-ui.json'),
  'flowbite': () => import('@iconify/json/json/flowbite.json'),
  'fluent-color': () => import('@iconify/json/json/fluent-color.json'),
  'fluent-emoji-flat': () => import('@iconify/json/json/fluent-emoji-flat.json'),
  'fluent-emoji-high-contrast': () => import('@iconify/json/json/fluent-emoji-high-contrast.json'),
  'fluent-emoji': () => import('@iconify/json/json/fluent-emoji.json'),
  'fluent-mdl2': () => import('@iconify/json/json/fluent-mdl2.json'),
  'fluent': () => import('@iconify/json/json/fluent.json'),
  'fontelico': () => import('@iconify/json/json/fontelico.json'),
  'fontisto': () => import('@iconify/json/json/fontisto.json'),
  'formkit': () => import('@iconify/json/json/formkit.json'),
  'foundation': () => import('@iconify/json/json/foundation.json'),
  'fxemoji': () => import('@iconify/json/json/fxemoji.json'),
  'gala': () => import('@iconify/json/json/gala.json'),
  'game-icons': () => import('@iconify/json/json/game-icons.json'),
  'garden': () => import('@iconify/json/json/garden.json'),
  'geo': () => import('@iconify/json/json/geo.json'),
  'gg': () => import('@iconify/json/json/gg.json'),
  'gis': () => import('@iconify/json/json/gis.json'),
  'gravity-ui': () => import('@iconify/json/json/gravity-ui.json'),
  'gridicons': () => import('@iconify/json/json/gridicons.json'),
  'grommet-icons': () => import('@iconify/json/json/grommet-icons.json'),
  'guidance': () => import('@iconify/json/json/guidance.json'),
  'healthicons': () => import('@iconify/json/json/healthicons.json'),
  'heroicons-outline': () => import('@iconify/json/json/heroicons-outline.json'),
  'heroicons-solid': () => import('@iconify/json/json/heroicons-solid.json'),
  'heroicons': () => import('@iconify/json/json/heroicons.json'),
  'hugeicons': () => import('@iconify/json/json/hugeicons.json'),
  'humbleicons': () => import('@iconify/json/json/humbleicons.json'),
  'ic': () => import('@iconify/json/json/ic.json'),
  'icomoon-free': () => import('@iconify/json/json/icomoon-free.json'),
  'icon-park-outline': () => import('@iconify/json/json/icon-park-outline.json'),
  'icon-park-solid': () => import('@iconify/json/json/icon-park-solid.json'),
  'icon-park-twotone': () => import('@iconify/json/json/icon-park-twotone.json'),
  'icon-park': () => import('@iconify/json/json/icon-park.json'),
  'iconamoon': () => import('@iconify/json/json/iconamoon.json'),
  'iconoir': () => import('@iconify/json/json/iconoir.json'),
  'icons8': () => import('@iconify/json/json/icons8.json'),
  'il': () => import('@iconify/json/json/il.json'),
  'ion': () => import('@iconify/json/json/ion.json'),
  'iwwa': () => import('@iconify/json/json/iwwa.json'),
  'ix': () => import('@iconify/json/json/ix.json'),
  'jam': () => import('@iconify/json/json/jam.json'),
  'la': () => import('@iconify/json/json/la.json'),
  'lets-icons': () => import('@iconify/json/json/lets-icons.json'),
  'line-md': () => import('@iconify/json/json/line-md.json'),
  'lineicons': () => import('@iconify/json/json/lineicons.json'),
  'logos': () => import('@iconify/json/json/logos.json'),
  'ls': () => import('@iconify/json/json/ls.json'),
  'lsicon': () => import('@iconify/json/json/lsicon.json'),
  'lucide-lab': () => import('@iconify/json/json/lucide-lab.json'),
  'lucide': () => import('@iconify/json/json/lucide.json'),
  'mage': () => import('@iconify/json/json/mage.json'),
  'majesticons': () => import('@iconify/json/json/majesticons.json'),
  'maki': () => import('@iconify/json/json/maki.json'),
  'map': () => import('@iconify/json/json/map.json'),
  'marketeq': () => import('@iconify/json/json/marketeq.json'),
  'material-icon-theme': () => import('@iconify/json/json/material-icon-theme.json'),
  'material-symbols-light': () => import('@iconify/json/json/material-symbols-light.json'),
  'material-symbols': () => import('@iconify/json/json/material-symbols.json'),
  'mdi-light': () => import('@iconify/json/json/mdi-light.json'),
  'medical-icon': () => import('@iconify/json/json/medical-icon.json'),
  'memory': () => import('@iconify/json/json/memory.json'),
  'meteocons': () => import('@iconify/json/json/meteocons.json'),
  'meteor-icons': () => import('@iconify/json/json/meteor-icons.json'),
  'mi': () => import('@iconify/json/json/mi.json'),
  'mingcute': () => import('@iconify/json/json/mingcute.json'),
  'mono-icons': () => import('@iconify/json/json/mono-icons.json'),
  'mynaui': () => import('@iconify/json/json/mynaui.json'),
  'nimbus': () => import('@iconify/json/json/nimbus.json'),
  'nonicons': () => import('@iconify/json/json/nonicons.json'),
  'noto-v1': () => import('@iconify/json/json/noto-v1.json'),
  'noto': () => import('@iconify/json/json/noto.json'),
  'nrk': () => import('@iconify/json/json/nrk.json'),
  'octicon': () => import('@iconify/json/json/octicon.json'),
  'oi': () => import('@iconify/json/json/oi.json'),
  'ooui': () => import('@iconify/json/json/ooui.json'),
  'openmoji': () => import('@iconify/json/json/openmoji.json'),
  'oui': () => import('@iconify/json/json/oui.json'),
  'pajamas': () => import('@iconify/json/json/pajamas.json'),
  'pepicons-pencil': () => import('@iconify/json/json/pepicons-pencil.json'),
  'pepicons-pop': () => import('@iconify/json/json/pepicons-pop.json'),
  'pepicons-print': () => import('@iconify/json/json/pepicons-print.json'),
  'pepicons': () => import('@iconify/json/json/pepicons.json'),
  'ph': () => import('@iconify/json/json/ph.json'),
  'picon': () => import('@iconify/json/json/picon.json'),
  'pixel': () => import('@iconify/json/json/pixel.json'),
  'pixelarticons': () => import('@iconify/json/json/pixelarticons.json'),
  'prime': () => import('@iconify/json/json/prime.json'),
  'proicons': () => import('@iconify/json/json/proicons.json'),
  'ps': () => import('@iconify/json/json/ps.json'),
  'qlementine-icons': () => import('@iconify/json/json/qlementine-icons.json'),
  'quill': () => import('@iconify/json/json/quill.json'),
  'radix-icons': () => import('@iconify/json/json/radix-icons.json'),
  'raphael': () => import('@iconify/json/json/raphael.json'),
  'rivet-icons': () => import('@iconify/json/json/rivet-icons.json'),
  'roentgen': () => import('@iconify/json/json/roentgen.json'),
  'si-glyph': () => import('@iconify/json/json/si-glyph.json'),
  'si': () => import('@iconify/json/json/si.json'),
  'sidekickicons': () => import('@iconify/json/json/sidekickicons.json'),
  'simple-icons': () => import('@iconify/json/json/simple-icons.json'),
  'simple-line-icons': () => import('@iconify/json/json/simple-line-icons.json'),
  'skill-icons': () => import('@iconify/json/json/skill-icons.json'),
  'solar': () => import('@iconify/json/json/solar.json'),
  'stash': () => import('@iconify/json/json/stash.json'),
  'streamline-block': () => import('@iconify/json/json/streamline-block.json'),
  'streamline-color': () => import('@iconify/json/json/streamline-color.json'),
  'streamline-cyber-color': () => import('@iconify/json/json/streamline-cyber-color.json'),
  'streamline-cyber': () => import('@iconify/json/json/streamline-cyber.json'),
  'streamline-emojis': () => import('@iconify/json/json/streamline-emojis.json'),
  'streamline-flex-color': () => import('@iconify/json/json/streamline-flex-color.json'),
  'streamline-flex': () => import('@iconify/json/json/streamline-flex.json'),
  'streamline-freehand-color': () => import('@iconify/json/json/streamline-freehand-color.json'),
  'streamline-freehand': () => import('@iconify/json/json/streamline-freehand.json'),
  'streamline-guidance': () => import('@iconify/json/json/streamline-guidance.json'),
  'streamline-kameleon-color': () => import('@iconify/json/json/streamline-kameleon-color.json'),
  'streamline-logos': () => import('@iconify/json/json/streamline-logos.json'),
  'streamline-pixel': () => import('@iconify/json/json/streamline-pixel.json'),
  'streamline-plump-color': () => import('@iconify/json/json/streamline-plump-color.json'),
  'streamline-plump': () => import('@iconify/json/json/streamline-plump.json'),
  'streamline-sharp-color': () => import('@iconify/json/json/streamline-sharp-color.json'),
  'streamline-sharp': () => import('@iconify/json/json/streamline-sharp.json'),
  'streamline-stickies-color': () => import('@iconify/json/json/streamline-stickies-color.json'),
  'streamline-ultimate-color': () => import('@iconify/json/json/streamline-ultimate-color.json'),
  'streamline-ultimate': () => import('@iconify/json/json/streamline-ultimate.json'),
  'streamline': () => import('@iconify/json/json/streamline.json'),
  'subway': () => import('@iconify/json/json/subway.json'),
  'svg-spinners': () => import('@iconify/json/json/svg-spinners.json'),
  'system-uicons': () => import('@iconify/json/json/system-uicons.json'),
  'tabler': () => import('@iconify/json/json/tabler.json'),
  'tdesign': () => import('@iconify/json/json/tdesign.json'),
  'teenyicons': () => import('@iconify/json/json/teenyicons.json'),
  'temaki': () => import('@iconify/json/json/temaki.json'),
  'token-branded': () => import('@iconify/json/json/token-branded.json'),
  'token': () => import('@iconify/json/json/token.json'),
  'topcoat': () => import('@iconify/json/json/topcoat.json'),
  'twemoji': () => import('@iconify/json/json/twemoji.json'),
  'typcn': () => import('@iconify/json/json/typcn.json'),
  'uil': () => import('@iconify/json/json/uil.json'),
  'uim': () => import('@iconify/json/json/uim.json'),
  'uis': () => import('@iconify/json/json/uis.json'),
  'uit': () => import('@iconify/json/json/uit.json'),
  'uiw': () => import('@iconify/json/json/uiw.json'),
  'unjs': () => import('@iconify/json/json/unjs.json'),
  'vaadin': () => import('@iconify/json/json/vaadin.json'),
  'vs': () => import('@iconify/json/json/vs.json'),
  'vscode-icons': () => import('@iconify/json/json/vscode-icons.json'),
  'websymbol': () => import('@iconify/json/json/websymbol.json'),
  'weui': () => import('@iconify/json/json/weui.json'),
  'whh': () => import('@iconify/json/json/whh.json'),
  'wi': () => import('@iconify/json/json/wi.json'),
  'wpf': () => import('@iconify/json/json/wpf.json'),
  'zmdi': () => import('@iconify/json/json/zmdi.json'),
  'zondicons': () => import('@iconify/json/json/zondicons.json'),
};
const availableSets = Object.keys(loaders)

watchEffect(async () => {
  const key = setParam.value
  if (!key || !loaders[key]) {
    iconSet.value = null
    return
  }
  loading.value = true
  try {
    const mod = await loaders[key]()
    iconSet.value = mod.default || mod
    if (iconSet.value && iconSet.value.icons) {
      try { (IconifyVue as any).addCollection?.(iconSet.value) } catch {}
      const names = Object.keys(iconSet.value.icons || {})
      const prefix = iconSet.value.prefix
      allIcons.value = names.map(n => `${prefix}:${n}`)
    } else {
      allIcons.value = []
    }
  } finally {
    loading.value = false
  }
})

onMounted(() => {
  if (!setParam.value) goto(availableSets[0]!)
})


const icons = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  const list = allIcons.value
  return q ? list.filter(id => id.includes(q)) : list
})

const total = computed(() => icons.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const pagedIcons = computed(() => {
  const p = Math.min(totalPages.value, Math.max(1, page.value))
  const start = (p - 1) * pageSize.value
  return icons.value.slice(start, start + pageSize.value)
})

watch([icons, pageSize], () => { page.value = 1 })
function prevPage() { if (page.value > 1) page.value -= 1 }
function nextPage() { if (page.value < totalPages.value) page.value += 1 }

function goto(set: string) {
  router.push({name: 'icons', params: {set}})
}
</script>

<template>
  <div class="section">
    <div class="section__title">Icons <ZButton size="sm" variant="default" @click="() => router.push('/docs/icon')">文档</ZButton></div>
    <div class="tools">
      <div class="sets-wrap">
        <ZScrollChips v-model="selectedSet" :items="availableSets" :centerOnSelect="true" :snapCenter="true" :smoothScroll="true" />
      </div>
      <ZScrollChips
        v-model="colorChoice"
        :items="colorItems"
      />
      <input class="search" v-model="search" placeholder="搜索图标（按名称包含）"/>
    </div>

    <div v-if="!setParam || !iconSet" class="empty">正在准备图标集合...</div>

    <div v-else class="gallery">
      <div class="gallery__meta">
        <span>集合：{{ iconSet.prefix }}</span>
        <span>数量：{{ Object.keys(iconSet.icons || {}).length }}</span>
        <div class="pager">
          <button class="pager__btn" @click="prevPage" :disabled="page<=1"><ZIcon name="bx:chevron-left"/></button>
          <span class="pager__info">{{ page }} / {{ totalPages }}</span>
          <button class="pager__btn" @click="nextPage" :disabled="page>=totalPages"><ZIcon name="bx:chevron-right"/></button>
        </div>
      </div>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="grid">
        <ZVirtualGrid :items="pagedIcons" :columns="12" :gap="8" :item-width="160" :item-height="44" :buffer-rows="1" edge-gutters>
          <template #cell="{ item }">
            <div class="cell" :title="item">
              <ZIcon :icon="item" size="24" :color="colorVar"/>
              <span class="cell__name">{{ item }}</span>
            </div>
          </template>
        </ZVirtualGrid>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section { padding: 16px; display: flex; flex-direction: column; }

.section__title {
  font-weight: 600;
  margin-bottom: 10px;
}

.tools {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  padding: 8px 0;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}


.sets-wrap { position: relative; display: flex; align-items: center; gap: 8px; flex: 1; min-width: 280px; }

.search {
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text);
  min-width: 220px;
}

.empty .row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.gallery__meta {
  display: flex;
  gap: 16px;
  color: var(--color-muted);
  font-size: 12px;
  margin-bottom: 8px;
}

.pager { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; }
.pager__btn { border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; }
.pager__btn:disabled { opacity: 0.5; cursor: not-allowed; }
.pager__info { color: var(--color-muted); }

.loading {
  color: var(--color-muted);
}

.gallery { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.grid { display: block; flex: 1; min-height: 0; }

.cell {
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
}

.cell__name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  color: var(--color-muted);
}
</style>
