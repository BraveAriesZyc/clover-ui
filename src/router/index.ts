import { createRouter, createWebHistory } from 'vue-router'
import ButtonDemo from '../demos/basic/ButtonDemo.vue'
import InputDemo from '../demos/form/InputDemo.vue'
import IconDemo from '../demos/icons/IconDemo.vue'
import FixedGridDemo from '../demos/layout/FixedGridDemo.vue'
import VirtualGridDemo from '../demos/layout/VirtualGridDemo.vue'
import MessageDemo from '../demos/feedback/MessageDemo.vue'
import AlertDemo from '../demos/feedback/AlertDemo.vue'
import ToastDemo from '../demos/feedback/ToastDemo.vue'
import LoadingDemo from '../demos/feedback/LoadingDemo.vue'
import CardDemo from '../demos/basic/CardDemo.vue'
import SvgDemo from '../demos/icons/SvgDemo.vue'
import ScrollChipsDemo from '../demos/basic/ScrollChipsDemo.vue'
import DocsPage from '../pages/docs/DocsPage.vue'
import Home from '../pages/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/card', component: CardDemo },
        { path: '/button', component: ButtonDemo },
        { path: '/input', component: InputDemo },
        { path: '/scroll-chips', component: ScrollChipsDemo },
        { path: '/fixed-grid', component: FixedGridDemo },
        { path: '/virtual-grid', component: VirtualGridDemo },
        { path: '/message', component: MessageDemo },
        { path: '/alert', component: AlertDemo },
        { path: '/toast', component: ToastDemo },
        { path: '/loading', component: LoadingDemo },
        { path: '/svg', component: SvgDemo },
        // 支持集合参数，例如 /icons/bi、/icons/mdi 等；可选参数也匹配 /icons
        { path: '/icons/:set?', name: 'icons', component: IconDemo },
        { path: '/docs/:name', name: 'docsPage', component: DocsPage },
    ],
})

export default router
