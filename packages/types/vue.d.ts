declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        ZButton: typeof import('../components/button')['ZButton']
        ZInput: typeof import('../components/input')['ZInput']
        ZIcon: typeof import('../components/icon')['ZIcon']
        Icon: typeof import('../components/icon')['Icon']
        SvgIcon: typeof import('../components/icon')['SvgIcon']
        ZCard: typeof import('../components/card')['ZCard']
        ZScrollChips: typeof import('../components/scroll-chips')['ZScrollChips']
        ZVirtualGrid: typeof import('../components/virtual-grid')['ZVirtualGrid']
        ZFixedGrid: typeof import('../components/fixed-grid')['ZFixedGrid']
        ZLoading: typeof import('../components/loading')['ZLoading']
    }
}

export {}
