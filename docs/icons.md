# Icon 使用指南

## 组件概览
- `Icon`：统一入口组件，基于 `@iconify/vue` 渲染 Iconify 图标；支持 `svg-icon:` 前缀加载本地 SVG。
- `SvgIcon`：本地 SVG 图标组件，基于 `import.meta.glob` 动态加载 `src/assets/icons` 目录下的文件。

## 基本用法
```vue
<template>
  <!-- 使用 Iconify 图标（建议带集合前缀） -->
  <Icon icon="ri:sun-line" />

  <!-- 使用本地 SVG 图标 -->
  <Icon icon="svg-icon:test" size="20" color="#409EFF" />

  <!-- 直接使用 SvgIcon -->
  <SvgIcon name="test" size="24" />
```

```ts
// 也可使用 @iconify-json 进行离线导入并传入对象
import RiMoonLine from '@iconify-json/ri/icons/moon-line.json'
// <Icon :icon="RiMoonLine" />
```

## 属性说明
- `icon | name`：图标名称；推荐统一使用 `icon`。本地 SVG 使用 `svg-icon:<name>` 前缀。
- `size`：支持数字（像素）或别名（`sm | md | lg`），默认 `16px`。
- `color`：前景色。
- `spin`：旋转动画。
- `faStyle`：FontAwesome 风格（`solid | regular | brands`）。
- `title`、`ariaHidden`：无障碍属性。

## 图标来源与加载策略
- Iconify 运行时：由 `@iconify/vue` 自动加载所需图标（推荐使用集合前缀，如 `ri:moon-line`、`mdi:close`）。
- FontAwesome 兼容：当使用 `fa:<name>` 时可配合 `faStyle` 自动映射到 `fa6-solid/fa6-regular/fa6-brands` 集合。
- 本地 SVG：放置于 `src/assets/icons`，通过 `svg-icon:<name>` 加载，编译期按需引入。

## 性能与优化
- `@iconify/vue` 按需加载并缓存图标数据。
- 本地 SVG 通过 `import.meta.glob` 按需打包，减小产物体积。

## 兼容性
- 现有 `ZIcon` 组件保持可用，内部已委托至新 `Icon` 组件；建议逐步迁移到 `Icon`。
