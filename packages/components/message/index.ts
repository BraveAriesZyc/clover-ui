import ZMessageVue from './src/ZMessage.vue'
import { withInstall } from '../../utils/withInstall'
export { openMessage, message } from './src/service'

const ZMessage = withInstall(ZMessageVue, 'ZMessage')
export default ZMessage
export { ZMessage }

