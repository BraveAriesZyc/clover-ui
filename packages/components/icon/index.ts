import ZIconVue from './src/ZIcon.vue'
import IconVue from './src/Icon.vue'
import SvgIconVue from './src/SvgIcon.vue'
import { withInstall } from '../../utils/withInstall'

const ZIcon = withInstall(ZIconVue, 'ZIcon')
const Icon = withInstall(IconVue, 'Icon')
const SvgIcon = withInstall(SvgIconVue, 'SvgIcon')

export default ZIcon
export { ZIcon, Icon, SvgIcon }
