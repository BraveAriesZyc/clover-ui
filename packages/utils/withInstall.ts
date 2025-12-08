import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Component>(component: T, name?: string): SFCWithInstall<T> => {
  const compName = name || (component as any).name
  ;(component as any).name = compName
  const _component = component as SFCWithInstall<T>
  _component.install = (app: App, ..._args: any[]) => {
    app.component(compName!, component as any)
  }
  return _component
}
