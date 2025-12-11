<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
const emits = defineEmits<{
    (e: 'goDocs'): void;
}>()
const {title} = props

const goDocs = () => {
    emits('goDocs')
}
</script>

<template>
    <div class="section">
        <div class="section__title">
            {{ title }} <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton>
        </div>
        <div class="content">
            <slot ></slot>
        </div>
    </div>
</template>

<style scoped  >
.section { padding: 1rem; height: 100%; display: flex; flex-direction: column; }
.section__title { font-weight: 600; margin-bottom: 0.625rem; }

</style>
