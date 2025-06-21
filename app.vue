<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- 全局加载状态 -->
    <LoadingSpinner v-if="pending" />
  </div>
</template>

<script setup lang="ts">
// 全局加载状态
const pending = ref(false)

// 监听路由变化 - 仅在客户端执行
onMounted(() => {
  const router = useRouter()
  router.beforeEach(() => {
    pending.value = true
  })

  router.afterEach(() => {
    // 立即隐藏加载状态，让内容显示
    nextTick(() => {
      pending.value = false
    })
  })
})

// 全局SEO配置
useSeoMeta({
  title: 'Counters - 桌游计分器',
  ogTitle: 'Counters - 桌游计分器',
  description: '一款专业的多平台桌游计分应用，支持扑克牌、斗地主、麻将等多种游戏类型，具备局域网联机、计分走势图等特色功能。',
  ogDescription: '一款专业的多平台桌游计分应用，支持扑克牌、斗地主、麻将等多种游戏类型，具备局域网联机、计分走势图等特色功能。',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image'
})

// 结构化数据 - 暂时注释掉，避免错误
// TODO: 需要安装 @nuxtjs/schema-org 模块或使用正确的API
/*
useSchemaOrg([
  {
    '@type': 'WebSite',
    name: 'Counters - 桌游计分器',
    url: 'https://counters.devyi.com',
    description: '一款专业的多平台桌游计分应用'
  },
  {
    '@type': 'SoftwareApplication',
    name: 'Counters',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Android, Windows, macOS, Linux',
    description: '专业的桌游计分应用，支持多种游戏类型和局域网联机功能',
    downloadUrl: 'https://github.com/youzhiran/counters/releases',
    author: {
      '@type': 'Organization',
      name: 'counters.devyi.com'
    }
  }
])
*/
</script>
