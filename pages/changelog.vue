<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-on-scroll">
          更新日志
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          了解 得益计分 的最新功能和改进
        </p>
      </div>
    </section>

    <!-- 版本历史 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <ChangelogLoader :fallback-versions="fallbackVersions" />
        </div>
      </div>
    </section>

    <!-- 未来规划 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            未来规划
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RoadmapItem
              v-for="item in roadmap"
              :key="item.title"
              :title="item.title"
              :description="item.description"
              :icon="item.icon"
              :status="item.status"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 反馈建议 -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">
            有功能建议？
          </h2>
          <p class="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            我们重视每一个用户的反馈，欢迎提出您的想法和建议
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/youzhiran/counters/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary bg-white text-primary-600 hover:bg-gray-50"
            >
              GitHub Issues
            </a>
            <NuxtLink
              to="/contact"
              class="btn-apple bg-transparent border-white text-white hover:bg-white/10 shadow-apple hover:shadow-apple-lg"
            >
              联系我们
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '更新日志 - Counters 桌游计分器',
  description: 'Counters 桌游计分器的版本更新历史，了解最新功能、改进和修复内容。',
  keywords: 'Counters更新日志,版本历史,新功能,bug修复,功能改进'
})

// 最小化的备用版本数据（仅在静态文件也无法加载时使用）
const fallbackVersions = [
  {
    version: 'v0.10.8-beta',
    date: '2025年6月',
    type: 'beta',
    features: [
      '新增更多游戏模板支持',
      '改进联机稳定性'
    ],
    improvements: [
      '优化用户界面响应速度',
      '修复已知问题'
    ],
    fixes: []
  },
  {
    version: 'v0.10.7-rc3',
    date: '2025年6月',
    type: 'release',
    features: [
      '全新设计的局域网联机状态，信息更详细，支持重连、管理等功能',
      '全新设计的消息系统，支持消息堆叠，界面更美观'
    ],
    improvements: [
      '修复了联网、消息和动画的一些问题',
      '优化了用户界面和交互体验'
    ],
    fixes: []
  }
]

// 未来规划
const roadmap = [
  {
    title: '更多游戏模板',
    description: '支持更多桌游类型，如UNO、大富翁等',
    icon: '🎮',
    status: 'planned'
  },
  {
    title: '云端数据同步',
    description: '支持账号登录和云端数据备份',
    icon: '☁️',
    status: 'planned'
  },
  {
    title: '社交功能',
    description: '好友系统、游戏分享等社交特性',
    icon: '👥',
    status: 'considering'
  },
  {
    title: '插件系统',
    description: '支持第三方插件扩展功能',
    icon: '🔌',
    status: 'considering'
  },
  {
    title: '统计分析',
    description: '详细的游戏数据统计和分析',
    icon: '📊',
    status: 'in-progress'
  },
  {
    title: '主题商店',
    description: '更多个性化主题和界面定制',
    icon: '🎨',
    status: 'planned'
  }
]
</script>
