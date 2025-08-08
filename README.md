# Counters 官方网站

这是 Counters 桌游计分器的官方网站，使用 Nuxt.js 3 + Vue 3 + TypeScript 构建。

注意：本网站使用 AI 直接生成，不保证内容正确性。

## 技术栈

- **框架**: Nuxt.js 3
- **前端**: Vue 3 + TypeScript
- **样式**: Tailwind CSS
- **字体**: PingFang SC, HarmonyOS Sans SC
- **图片**: Nuxt Image
- **部署**: 支持 SSR/SSG

## 功能特性

- 🎨 苹果风格设计语言
- 📱 完全响应式设计
- ⚡ 服务端渲染 (SSR)
- 🔍 SEO 优化
- 🌐 多语言支持准备
- 📊 性能优化
- 🎭 流畅动画效果

## 开发环境

### 环境要求

推荐使用 choco 安装 nodejs 22.18.0

```bash
choco install nodejs --version="22.18.0"
```

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

### 生成静态站点

```bash
npm run generate
# 或
yarn generate
# 或
pnpm generate
```

## 项目结构

```
ai-web/
├── assets/          # 静态资源
├── components/      # Vue 组件
├── layouts/         # 布局组件
├── pages/           # 页面组件
├── public/          # 公共文件
├── server/          # 服务端代码
├── nuxt.config.ts   # Nuxt 配置
├── tailwind.config.js # Tailwind 配置
└── package.json     # 项目配置
```

## 页面说明

- **首页** (`/`) - 产品介绍和核心功能展示
- **功能特性** (`/features`) - 详细功能介绍
- **下载页面** (`/download`) - 各平台下载链接
- **使用指南** (`/guide`) - 详细使用教程
- **技术文档** (`/docs`) - 开发者文档
- **更新日志** (`/changelog`) - 版本更新历史
- **关于我们** (`/about`) - 项目背景和理念
- **联系反馈** (`/contact`) - 反馈渠道和联系方式

## 设计理念

### 苹果风格设计

- 简洁现代的视觉语言
- 大量留白和清晰层次
- 优雅的字体排版
- 流畅的动画过渡
- 圆角和阴影效果

### 响应式设计

- **桌面端** (≥1200px): 三栏布局，丰富交互
- **平板端** (768px-1199px): 两栏布局，适中内容
- **移动端** (<768px): 单栏布局，大按钮设计

## 性能优化

- 图片懒加载和格式优化
- 代码分割和按需加载
- CSS 和 JS 压缩
- 字体预加载
- SEO 元数据优化

### 自建服务器

```bash
# 构建项目
npm run build

# 启动生产服务器
node .output/server/index.mjs
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License

## 联系方式

- GitHub: https://github.com/youzhiran/counters
- 网站: https://counters.devyi.com
