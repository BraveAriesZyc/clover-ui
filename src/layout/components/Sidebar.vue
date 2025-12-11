<script setup lang="ts">
import {computed, ref, watch} from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import groups from '../../data/nav'

    const router = useRouter()
    const route = useRoute()
    const props = defineProps<{ collapsed?: boolean }>()
    function toggle() {
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

    function nav(to: string) {
        if (to === '/icons') {
            router.push({ name: 'icons', params: { set: 'bi' } })
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
        flyout.value = { open: true, name, top }
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
        <div class="sidebar__title">
            <span class="sidebar__brand">Clover UI</span>
            <button class="sidebar__toggle" @click="toggle" :title="props.collapsed ? '展开' : '折叠'">
                <ZIcon :name="props.collapsed ? 'bx:chevrons-right' : 'bx:chevrons-left'" />
            </button>
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
                        <ZIcon v-if="g.icon" :name="g.icon" size="md" />
                        <span class="sidebar__group-name-text">{{ g.name }}</span>
                    </span>
                    <span class="sidebar__caret"><ZIcon name="bx:chevron-down" /></span>
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
                        <ZIcon v-if="it.icon" :name="it.icon" size="md" />
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
            <ZIcon v-if="currentGroup?.icon" :name="currentGroup.icon" size="md" />
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
                <ZIcon v-if="it.icon" :name="it.icon" size="md" />
                <span>{{ it.label }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .sidebar {
        width: 200px;
        background: var(--color-bg);
        border-right: none;
        padding: 12px;
        box-sizing: border-box;
        --nav-row-h: 40px;
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: opacity 0.2s ease;
        contain: layout paint;
    }
    .sidebar[data-collapsed='true'] {
        width: 72px;
    }
    .sidebar__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 14px;
        color: var(--color-text);
    }
    .sidebar__groups {
        flex: 1;
        overflow: auto;
        overscroll-behavior: contain;
        content-visibility: auto;
    }
    .sidebar__group {
        margin: 0;
    }
    .sidebar[data-collapsed='true'] .sidebar__group {
        height: var(--nav-row-h);
        overflow: hidden;
    }
    .sidebar__brand {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .sidebar__toggle {
        border: none;
        background: transparent;
        border-radius: 6px;
        width: 28px;
        height: 24px;
        cursor: pointer;
        color: var(--color-muted);
    }
    .sidebar__toggle:hover {
        background: var(--color-bg-muted);
    }
    .sidebar__group-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        color: var(--color-muted);
        margin: 0;
        letter-spacing: 0.2px;
        background: transparent;
        border: none;
        padding: 0 6px;
        min-height: var(--nav-row-h);
        line-height: var(--nav-row-h);
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }
    .sidebar__group-title:hover {
        background: var(--nav-hover-bg);
    }
    .sidebar__caret {
        transition: transform 0.2s ease;
        opacity: 0.6;
        transform: rotate(-90deg);
        width: 20px;
        min-width: 20px;
        display: inline-flex;
        justify-content: center;
    }
    .sidebar__group-title[data-open='true'] .sidebar__caret {
        transform: rotate(0deg);
    }
    .sidebar__group-title[data-active='true'] {
        color: var(--color-primary);
    }
    .sidebar[data-collapsed='true'] .sidebar__group-title {
        padding: 0 6px;
        justify-content: flex-start;
        min-height: var(--nav-row-h);
    }
    .sidebar__group-name {
        display: grid;
        grid-template-columns: 20px 1fr;
        align-items: center;
        column-gap: 6px;
    }
    .sidebar__group-name :deep(.z-icon) {
        width: 20px;
        min-width: 20px;
        display: inline-flex;
        justify-content: center;
    }
    .sidebar__group-name-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .sidebar[data-collapsed='true'] .sidebar__group-name {
        grid-template-columns: 20px 0;
        column-gap: 0;
    }
    .sidebar[data-collapsed='true'] .sidebar__group-name-text {
        opacity: 0;
    }
    .sidebar[data-collapsed='true'] .sidebar__group-title :deep(.z-icon) {
        margin-right: 0;
    }
    .sidebar[data-collapsed='true'] .sidebar__caret {
        display: none;
    }
    .sidebar__items {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding-left: 12px;
    }
    .sidebar__items {
        overflow: hidden;
        transition:
            max-height 0.25s ease,
            opacity 0.25s ease;
        will-change: max-height, opacity;
        content-visibility: auto;
        contain: layout paint;
    }
    .sidebar__items[data-open='true'] {
        max-height: 1000px;
        opacity: 1;
    }
    .sidebar__items[data-open='false'] {
        max-height: 0;
        opacity: 0;
    }
    .sidebar__item {
        display: grid;
        grid-template-columns: 20px 1fr;
        align-items: center;
        column-gap: 8px;
        text-align: left;
        position: relative;
        padding: 0 8px;
        min-height: var(--nav-row-h);
        line-height: var(--nav-row-h);
        border-radius: 6px;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #5e6166;
    }
    .sidebar__item :deep(.z-icon) {
        width: 20px;
        min-width: 20px;
        display: inline-flex;
        justify-content: center;
    }
    .sidebar__item:hover {
        background: var(--nav-hover-bg);
    }
    .sidebar__item[data-active='true'] {
        color: var(--color-primary);
        background: var(--nav-active-bg);
    }
    .sidebar__item[data-active='true']::before {
        content: none;
    }
    .sidebar__item-label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .sidebar[data-collapsed='true'] .sidebar__item {
        grid-template-columns: 20px 0;
        column-gap: 0;
    }
    .sidebar[data-collapsed='true'] .sidebar__item-label {
        opacity: 0;
    }
    .sidebar__group-title :deep(.z-icon) {
        margin-right: 6px;
    }
    .sidebar__toggle :deep(.z-icon) {
        font-size: 18px;
    }

    .sidebar__flyout-backdrop {
        position: fixed;
        inset: 0;
        background: transparent;
        z-index: 20;
    }
    .sidebar__flyout {
        position: fixed;
        left: 72px;
        z-index: 21;
        min-width: 220px;
        max-height: 70vh;
        overflow: auto;
        background: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        padding: 8px;
    }
    .sidebar__flyout-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--color-muted);
        padding: 4px 2px 8px;
    }
    .sidebar__flyout-items {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .sidebar__flyout-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--color-text);
        cursor: pointer;
    }
    .sidebar__flyout-item:hover {
        background: var(--color-bg-muted);
    }
    .sidebar__flyout-item[data-active='true'] {
        color: var(--color-primary);
    }
</style>
