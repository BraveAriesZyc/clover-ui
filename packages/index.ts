import type { App } from 'vue'
import './theme-chalk/index.css'
import ZButton from './components/button'
import ZInput from './components/input'
import ZIcon, { Icon, SvgIcon } from './components/icon'
import ZCard from './components/card'
import ZScrollChips from './components/scroll-chips'
import ZVirtualGrid from './components/virtual-grid'
import ZFixedGrid from './components/fixed-grid'
import ZLoading from './components/loading'
import ZLayout, { ZLayoutHeader, ZLayoutSidebar, ZLayoutContent } from './components/layout'
import ZMessage from './components/message'
export { openMessage, message } from './components/message'

export { openLoading } from './components/loading'
export { useLoading } from './components/loading'
export {
    ZButton,
    ZInput,
    ZIcon,
    ZCard,
    Icon,
    SvgIcon,
    ZScrollChips,
    ZVirtualGrid,
    ZFixedGrid,
    ZLoading,
    ZLayout,
    ZLayoutHeader,
    ZLayoutSidebar,
    ZLayoutContent,
    ZMessage,
}

export default {
    install: (app: App) => {
        app.use(ZButton)
        app.use(ZInput)
        app.use(ZIcon)
        app.use(Icon)
        app.use(SvgIcon)
        app.use(ZCard)
        app.use(ZScrollChips)
        app.use(ZVirtualGrid)
        app.use(ZFixedGrid)
        app.use(ZLoading)
        app.use(ZLayout)
        app.use(ZLayoutHeader)
        app.use(ZLayoutSidebar)
        app.use(ZLayoutContent)
        app.use(ZMessage)
    },
}
