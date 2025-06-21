export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-schema-org'
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Inter': [300, 400, 500, 600, 700],
      'Noto Sans SC': [300, 400, 500, 600, 700]
    },
    display: 'swap',
    preload: true
  },

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
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
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
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://counters.devyi.com',
      githubUrl: 'https://github.com/youzhiran/counters',
      releasesUrl: 'https://github.com/youzhiran/counters/releases'
    }
  }
})
