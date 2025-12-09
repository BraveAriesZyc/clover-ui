# 部署文档

## 生产环境配置
- 构建站点：`pnpm run build:app`（输出到 `dist/app`）
- 静态部署：将 `dist/app` 上传至静态服务器（如 Nginx）

## 性能优化
- 路由按需加载与分包（`manualChunks` 已配置）
- 图标集合谨慎引入，避免无用资源
- 开启压缩与缓存策略（由宿主服务器负责）

## 注意事项
- 组件库与站点构建版本需与 `package.json.version` 保持一致
