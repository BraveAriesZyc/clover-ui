<script setup lang="ts">
export type MessageItem = {
    id: number
    text: string
    type?: 'success' | 'warning' | 'info' | 'error'
    duration?: number
    showClose?: boolean
}
const props = defineProps<{ list: MessageItem[]; onClose?: (id: number) => void }>()
</script>

<template>
    <div class="z-message-container">
        <TransitionGroup name="z-message-fade">
            <div v-for="m in props.list" :key="m.id" class="z-message" :data-type="m.type || 'info'">
                <div class="z-message__content">
                    <span class="z-message__icon"/>
                    <span class="z-message__text">{{ m.text }}</span>
                </div>
                <span v-if="m.showClose" class="z-message__close" @click="props.onClose?.(m.id)">×</span>
            </div>
        </TransitionGroup>
    </div>
</template>
