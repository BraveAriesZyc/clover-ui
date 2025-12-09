import { useLoading } from './useLoading'

export type LoadingOptions = {
    text?: string
    mask?: boolean
    variant?:
        | 'primary'
        | 'default'
        | 'danger'
        | 'success'
        | 'warning'
        | 'info'
        | 'secondary'
        | 'blue'
    duration?: number
    target?: HTMLElement
}

export function openLoading(options?: LoadingOptions) {
    const loader = useLoading(undefined, {
        text: options?.text,
        mask: options?.mask,
        variant: options?.variant,
        autoCloseMs: options?.duration,
        target: options?.target,
    })
    loader.startLoading()
    return {
        close() {
            loader.stopLoading()
        },
    }
}
