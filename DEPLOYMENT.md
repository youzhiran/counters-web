# 部署指南

本文档介绍如何部署 Counters 官方网站到各种平台。

## 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone <repository-url>
cd ai-web

# 安装依赖并设置
npm run setup

# 启动开发服务器
npm run dev
```

### 2. 环境变量配置

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_GITHUB_URL=https://github.com/youzhiran/counters
NUXT_PUBLIC_RELEASES_URL=https://github.com/youzhiran/counters/releases
```

## 部署平台

### Vercel (推荐)

1. **连接 GitHub**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 选择 GitHub 仓库

2. **配置项目**
   - Framework Preset: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output`

3. **环境变量**
   - 在 Vercel 项目设置中添加环境变量
   - 复制 `.env.example` 中的变量

4. **自定义域名**
   - 在项目设置中添加自定义域名
   - 配置 DNS 记录

### Netlify

1. **连接 GitHub**
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 仓库

2. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `.output/public`
   - Node version: 18

3. **环境变量**
   - 在站点设置中添加环境变量

4. **自定义配置**
   - `netlify.toml` 文件已包含必要配置

### GitHub Pages

1. **启用 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 GitHub Actions 作为源

2. **创建工作流**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: 'npm'
         - run: npm ci
         - run: npm run generate
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .output/public
   ```

### 自建服务器

1. **服务器要求**
   - Node.js 18+
   - PM2 (推荐)
   - Nginx (可选)

2. **部署步骤**
   ```bash
   # 克隆代码
   git clone <repository-url>
   cd ai-web
   
   # 安装依赖
   npm ci
   
   # 构建项目
   npm run build
   
   # 使用 PM2 启动
   pm2 start ecosystem.config.js
   ```

3. **PM2 配置**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'counters-website',
       script: '.output/server/index.mjs',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   ```

4. **Nginx 配置**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## 性能优化

### 1. 图片优化

- 使用 WebP 格式
- 添加适当的 alt 文本
- 配置图片懒加载

### 2. 缓存策略

- 静态资源长期缓存
- HTML 文件短期缓存
- API 响应适当缓存

### 3. CDN 配置

- 使用 CDN 加速静态资源
- 配置适当的缓存头
- 启用 Gzip 压缩

## 监控和分析

### 1. Google Analytics

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID
    }
  }
})
```

### 2. 错误监控

- 使用 Sentry 监控错误
- 配置性能监控
- 设置告警通知

### 3. 性能监控

- 使用 Lighthouse 检查性能
- 监控 Core Web Vitals
- 定期性能审计

## 安全配置

### 1. HTTPS

- 强制使用 HTTPS
- 配置 HSTS 头
- 使用安全的 TLS 配置

### 2. 安全头

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      }
    }
  }
})
```

### 3. 内容安全策略

- 配置 CSP 头
- 限制外部资源加载
- 防止 XSS 攻击

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清除缓存: `rm -rf .nuxt .output node_modules`
   - 重新安装依赖: `npm ci`

2. **图片加载失败**
   - 检查图片路径
   - 确认图片文件存在
   - 检查图片格式支持

3. **样式问题**
   - 检查 Tailwind CSS 配置
   - 确认 CSS 文件正确加载
   - 检查浏览器兼容性

### 调试技巧

1. **开发模式调试**
   ```bash
   npm run dev -- --debug
   ```

2. **生产构建调试**
   ```bash
   npm run build -- --debug
   ```

3. **查看构建日志**
   - 检查构建输出
   - 查看错误信息
   - 分析性能指标

## 维护

### 1. 定期更新

- 更新依赖包
- 检查安全漏洞
- 测试新功能

### 2. 备份策略

- 定期备份代码
- 备份配置文件
- 备份数据库（如有）

### 3. 监控检查

- 定期检查网站状态
- 监控性能指标
- 检查错误日志
