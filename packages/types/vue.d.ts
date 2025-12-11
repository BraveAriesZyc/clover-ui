declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        ZButton:
            | (typeof import('../components/button'))['ZButton']
            | (typeof import('../index'))['ZButton']
        ZInput:
            | (typeof import('../components/input'))['ZInput']
            | (typeof import('../index'))['ZInput']
        ZIcon: (typeof import('../components/icon'))['ZIcon'] | (typeof import('../index'))['ZIcon']
        Icon: (typeof import('../components/icon'))['Icon'] | (typeof import('../index'))['Icon']
        SvgIcon:
            | (typeof import('../components/icon'))['SvgIcon']
            | (typeof import('../index'))['SvgIcon']
        ZCard: (typeof import('../components/card'))['ZCard'] | (typeof import('../index'))['ZCard']
        ZScrollChips:
            | (typeof import('../components/scroll-chips'))['ZScrollChips']
            | (typeof import('../index'))['ZScrollChips']
        ZVirtualGrid:
            | (typeof import('../components/virtual-grid'))['ZVirtualGrid']
            | (typeof import('../index'))['ZVirtualGrid']
        ZFixedGrid:
            | (typeof import('../components/fixed-grid'))['ZFixedGrid']
            | (typeof import('../index'))['ZFixedGrid']
        ZLoading:
            | (typeof import('../components/loading'))['ZLoading']
            | (typeof import('../index'))['ZLoading']
        ZLayout:
            | (typeof import('../components/layout'))['ZLayout']
            | (typeof import('../index'))['ZLayout']
        ZLayoutHeader:
            | (typeof import('../components/layout'))['ZLayoutHeader']
            | (typeof import('../index'))['ZLayoutHeader']
        ZLayoutSidebar:
            | (typeof import('../components/layout'))['ZLayoutSidebar']
            | (typeof import('../index'))['ZLayoutSidebar']
        ZLayoutContent:
            | (typeof import('../components/layout'))['ZLayoutContent']
            | (typeof import('../index'))['ZLayoutContent']
    }
}

export {}
