<script setup lang="ts">
    import { computed } from 'vue'

    type Variant =
        | 'primary'
        | 'default'
        | 'danger'
        | 'success'
        | 'warning'
        | 'info'
        | 'secondary'
        | 'blue'
    type Size = 'sm' | 'md' | 'lg'
    type NativeType = 'button' | 'submit' | 'reset'

    const props = defineProps<{
        variant?: Variant
        size?: Size
        disabled?: boolean
        loading?: boolean
        nativeType?: NativeType
    }>()

    const emit = defineEmits<{
        (e: 'click', evt: MouseEvent): void
    }>()

    const variant = computed(() => props.variant ?? 'primary')
    const size = computed(() => props.size ?? 'md')
    const disabled = computed(() => props.disabled ?? false)
    const loading = computed(() => props.loading ?? false)
    const nativeType = computed(() => props.nativeType ?? 'button')

    const classes = computed(() => [
        'z-button',
        `z-button--${variant.value}`,
        `z-button--${size.value}`,
        { 'is-disabled': disabled.value, 'is-loading': loading.value },
    ])

    function onClick(evt: MouseEvent) {
        if (disabled.value || loading.value) {
            evt.preventDefault()
            evt.stopPropagation()
            return
        }
        emit('click', evt)
    }
</script>

<template>
    <button
        :class="classes"
        :type="nativeType"
        :disabled="disabled"
        :aria-disabled="disabled ? 'true' : 'false'"
        :aria-busy="loading ? 'true' : 'false'"
        @click="onClick"
    >
        <span class="z-button__icon"><slot name="icon"></slot></span>
        <span class="z-button__label"><slot>按钮</slot></span>
    </button>
</template>
