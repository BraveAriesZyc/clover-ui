<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import DisplayPage from "../../components/Layout/DisplayPage.vue";
    const router = useRouter()
    function goDocs() {
        router.push('/docs/card')
    }
</script>

<template>

    <DisplayPage title="Cards" @goDocs="goDocs">
        <div class="grid">
            <ZCard padding="sm" hoverable bordered>
                <div class="demo-line">SM · Hoverable</div>
            </ZCard>
            <ZCard padding="md" shadow="sm" bordered>
                <div class="demo-line">MD · Shadow SM</div>
            </ZCard>
            <ZCard padding="lg" shadow="md" bordered clickable>
                <div class="demo-line">LG · Shadow MD · Clickable</div>
            </ZCard>
            <ZCard padding="md" shadow="lg">
                <div class="demo-line">No Border · Shadow LG</div>
            </ZCard>
        </div>
    </DisplayPage>

</template>

<style scoped>

    .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }
    .demo-line {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        color: var(--color-muted);
    }
</style>
