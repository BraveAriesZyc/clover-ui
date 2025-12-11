import ZLayoutVue from './src/ZLayout.vue'
import ZLayoutHeaderVue from './src/ZLayoutHeader.vue'
import ZLayoutSidebarVue from './src/ZLayoutSidebar.vue'
import ZLayoutContentVue from './src/ZLayoutContent.vue'
import { withInstall } from '../../utils/withInstall'

const ZLayout = withInstall(ZLayoutVue, 'ZLayout')
const ZLayoutHeader = withInstall(ZLayoutHeaderVue, 'ZLayoutHeader')
const ZLayoutSidebar = withInstall(ZLayoutSidebarVue, 'ZLayoutSidebar')
const ZLayoutContent = withInstall(ZLayoutContentVue, 'ZLayoutContent')

export default ZLayout
export { ZLayout, ZLayoutHeader, ZLayoutSidebar, ZLayoutContent }

