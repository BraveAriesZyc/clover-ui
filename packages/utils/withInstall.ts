import type { App, Component, Plugin } from 'vue'

/**
 * 将单文件组件包装为可通过 app.use() 注册的插件，并以给定名称进行全局注册。
 * @param component 需要安装的组件
 * @param name 组件的全局名称（不传则使用组件内置 name）
 * @returns 带有 install 的组件，用于按需 app.use()
 */
export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Component>(
    component: T,
    name?: string,
): SFCWithInstall<T> => {
    const compName = name || (component as any).name
    ;(component as any).name = compName
  const _component = component as SFCWithInstall<T>
  _component.install = (app: App, ..._args: any[]) => {
    app.component(compName!, component as any)
  }
  return _component
}
