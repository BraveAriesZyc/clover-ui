declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        ZButton: typeof import('../index')['ZButton']
        ZInput: typeof import('../index')['ZInput']
        ZIcon: typeof import('../index')['ZIcon']
        Icon: typeof import('../index')['Icon']
        SvgIcon: typeof import('../index')['SvgIcon']
        ZCard: typeof import('../index')['ZCard']
        ZScrollChips: typeof import('../index')['ZScrollChips']
        ZVirtualGrid: typeof import('../index')['ZVirtualGrid']
        ZFixedGrid: typeof import('../index')['ZFixedGrid']
        ZLoading: typeof import('../index')['ZLoading']
    }
}

export {}
