import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import CloverUI from '../packages'
import './styles/theme/dark.css'
import './styles/global.css'

const startApp = () => {
    const app = createApp(App)
    app.use(CloverUI)
    app.use(router)
    app.mount('#app')
}
startApp()
