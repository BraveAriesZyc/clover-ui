<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import groups from '../../data/nav'

const router = useRouter()
const route = useRoute()
const props = defineProps<{ collapsed?: boolean; toggle?: () => void }>()

function toggleLocal() {
    const next = !(props.collapsed ?? false)
    if (next) {
        Object.keys(openGroups.value).forEach((k) => {
            openGroups.value[k] = false
        })
    } else {
        const current = groups.find((g) => g.items.some((it) => route.path.startsWith(it.key)))
        Object.keys(openGroups.value).forEach((k) => {
            openGroups.value[k] = current
                ? k === current.name
                : k === (groups[0]!.name as string)
        })
    }
}

function toggle() {
    (props.toggle ?? toggleLocal)()
}

function nav(to: string) {
    if (to === '/icons') {
        router.push({name: 'icons', params: {set: 'bi'}})
    } else {
        router.push(to)
    }
}

const accordion = true
const openGroups = ref<Record<string, boolean>>({})
const isActivePath = (path: string, key: string) => path.startsWith(key)
const findGroupByPath = (path: string) =>
    groups.find((g) => g.items.some((it) => isActivePath(path, it.key)))
const matched = findGroupByPath(route.path)
groups.forEach((g, i) => {
    openGroups.value[g.name] = matched ? g.name === matched.name : i === 0
})
watch(
    () => route.path,
    (p) => {
        const m = groups.find((g) => g.items.some((it) => p.startsWith(it.key)))
        Object.keys(openGroups.value).forEach((k) => {
            openGroups.value[k] = m ? k === m.name : k === (groups[0]!.name as string)
        })
    },
)
const flyout = ref<{ open: boolean; name: string; top: number }>({
    open: false,
    name: '',
    top: 0,
})
const currentGroup = computed(() => groups.find((g) => g.name === flyout.value.name))

function openFlyout(name: string, top: number) {
    flyout.value = {open: true, name, top}
}

function closeFlyout() {
    flyout.value.open = false
}

function toggleGroup(name: string, evt?: MouseEvent) {
    if (props.collapsed) {
        const rect = (evt?.currentTarget as HTMLElement)?.getBoundingClientRect()
        openFlyout(name, rect ? rect.top : 64)
        return
    }
    if (accordion) {
        Object.keys(openGroups.value).forEach((k) => {
            openGroups.value[k] = k === name ? !openGroups.value[k] : false
        })
    } else {
        openGroups.value[name] = !openGroups.value[name]
    }
}
</script>

<template>
    <aside class="sidebar" :data-collapsed="props.collapsed ? 'true' : 'false'">
        <div class="sidebar__slot">
            <slot name="header"/>
        </div>
        <div class="sidebar__groups">
            <div v-for="g in groups" :key="g.name" class="sidebar__group">
                <button
                    class="sidebar__group-title"
                    :data-open="!props.collapsed && openGroups[g.name] ? 'true' : 'false'"
                    :data-active="
                        g.items.some((it) => isActivePath(route.path, it.key)) ? 'true' : 'false'
                    "
                    @click="toggleGroup(g.name, $event)"
                    :aria-expanded="!props.collapsed && openGroups[g.name]"
                >
                    <span class="sidebar__group-name">
                        <ZIcon v-if="g.icon" :name="g.icon" size="md"/>
                        <span class="sidebar__group-name-text">{{ g.name }}</span>
                    </span>
                    <span class="sidebar__caret"><ZIcon name="bx:chevron-down"/></span>
                </button>
                <div
                    class="sidebar__items"
                    :data-open="!props.collapsed && openGroups[g.name] ? 'true' : 'false'"
                >
                    <button
                        v-for="it in g.items"
                        :key="it.key"
                        class="sidebar__item"
                        :data-active="isActivePath(route.path, it.key)"
                        :title="it.label"
                        @click="nav(it.key)"
                    >
                        <ZIcon v-if="it.icon" :name="it.icon" size="md"/>
                        <span
                            class="sidebar__item-label"
                            :data-collapsed="props.collapsed ? 'true' : 'false'"
                        >
                            {{ collapsed ? it.short : it.label }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </aside>
    <div
        v-if="props.collapsed && flyout.open"
        class="sidebar__flyout-backdrop"
        @click="closeFlyout"
    ></div>
    <div
        v-if="props.collapsed && flyout.open"
        class="sidebar__flyout"
        :style="{ top: flyout.top + 'px' }"
    >
        <div class="sidebar__flyout-title">
            <ZIcon v-if="currentGroup?.icon" :name="currentGroup.icon" size="md"/>
            <span>{{ currentGroup?.name }}</span>
        </div>
        <div class="sidebar__flyout-items">
            <button
                v-for="it in currentGroup?.items"
                :key="it.key"
                class="sidebar__flyout-item"
                :data-active="route.path === it.key"
                @click="nav(it.key); closeFlyout()"
            >
                <ZIcon v-if="it.icon" :name="it.icon" size="md"/>
                <span>{{ it.label }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
