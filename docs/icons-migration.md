# Icon 迁移指南

## 目标
对齐 yudao/vben 的图标设计：统一入口、支持本地 SVG 与 Iconify、完善的尺寸/颜色控制与类型提示、按需加载与缓存优化。

## 从 ZIcon 迁移到 Icon
- 现状：`ZIcon` 已兼容并委托到新实现，迁移可逐步进行。
- 改造建议：
  - 将 `name` 更名为 `icon`（兼容保留）；推荐统一使用 `icon`。
  - 使用集合前缀：`ri:home-2-line`、`mdi:close` 等；避免依赖 `set`。
  - 本地 SVG 使用 `svg-icon:<name>` 前缀：`svg-icon:test`。

## 使用本地 SVG
1. 将 SVG 文件置于 `src/assets/icons`（或子目录）。
2. 通过 `Icon icon="svg-icon:<name>"` 或 `SvgIcon name="<name>"` 引用。
3. 建议移除 SVG 内的固定 `fill`/`width`/`height` 属性，使用 CSS 控制颜色与尺寸。

## 字体图标回退
- 若离线 JSON 未包含目标图标，组件将自动按图标集注入 CSS 并渲染 `<i>` 类名：
  - `bi`、`fa`、`ri`、`mdi`、`bx`、`ti`、`typcn`。
- 可通过 `faStyle` 控制 FontAwesome 风格（`solid | regular | brands`）。

## 常见改动示例
```vue
<!-- 旧 -->
<ZIcon name="ri:moon-line" />

<!-- 新（等价） -->
<Icon icon="ri:moon-line" />

<!-- 旧：本地 SVG 不支持 -->

<!-- 新：本地 SVG -->
<Icon icon="svg-icon:test" size="20" color="#409EFF" />
```

## 注意事项
- 保持按需：仅在需要时加载对应集合的 JSON 或字体 CSS。
- 统一命名：优先使用带前缀的 `icon` 字符串，避免依赖 `set` 的无前缀形式。
- 类型与全局声明：`Icon`/`SvgIcon` 已在 `packages/types/vue.d.ts` 注册为全局组件。

