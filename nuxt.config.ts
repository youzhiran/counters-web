export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-06-24',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-schema-org'
  ],

  // 允许内联脚本用于分析工具
  ssr: true,

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Counters - 桌游计分器',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '一款专业的多平台桌游计分应用，支持扑克牌、斗地主、麻将等多种游戏类型，具备局域网联机、计分走势图等特色功能。'
        },
        { name: 'keywords', content: '桌游,计分器,扑克牌,斗地主,麻将,Flutter,多平台,局域网联机' },
        { name: 'author', content: 'counters.devyi.com' },
        { property: 'og:title', content: 'Counters - 桌游计分器' },
        { property: 'og:description', content: '一款专业的多平台桌游计分应用' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://counters.devyi.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Counters - 桌游计分器' },
        { name: 'twitter:description', content: '一款专业的多平台桌游计分应用' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      script: [
        {
          innerHTML: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s3qts1pxwm");
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // 解决中间件冲突警告
  router: {
    options: {
      hashMode: false
    }
  },

  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  runtimeConfig: {
    // 服务端环境变量
    githubToken: process.env.GITHUB_TOKEN,

    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://counters.devyi.com',
      githubUrl: 'https://github.com/youzhiran/counters',
      releasesUrl: 'https://github.com/youzhiran/counters/releases'
    }
  }
})
