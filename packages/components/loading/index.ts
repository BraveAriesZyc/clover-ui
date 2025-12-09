import ZLoadingVue from './src/ZLoading.vue'
import { withInstall } from '../../utils/withInstall'

const ZLoading = withInstall(ZLoadingVue, 'ZLoading')

export default ZLoading
export { ZLoading }
export * from './src/service'
export * from './src/useLoading'
