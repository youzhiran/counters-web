<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-responsive-lg font-bold text-gray-900 mb-4 animate-on-scroll">
          更新日志
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          了解 Counters 的最新功能和改进
        </p>
      </div>
    </section>

    <!-- 版本历史 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <div class="space-y-12">
            <VersionCard
              v-for="version in versions"
              :key="version.version"
              :version="version"
              class="animate-on-scroll"
            />
          </div>
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
          <h2 class="text-2xl font-bold text-white mb-4">
            有功能建议？
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
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

// 版本历史数据
const versions = [
  {
    version: 'v0.10.7-rc3',
    date: '2025年1月',
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
  },
  {
    version: 'v0.10.5-rc2',
    date: '2024年12月',
    type: 'release',
    features: [],
    improvements: [
      '修复了一些 UI 和联机问题',
      '提升了应用稳定性'
    ],
    fixes: []
  },
  {
    version: 'v0.10.4-rc1',
    date: '2024年11月',
    type: 'release',
    features: [
      '新增麻将模板，支持显示为 2 位小数计分',
      '新增点击计数器模板，点击单元格即可快速+1',
      '新增字体选择功能',
      '新增关于应用页面&软件许可',
      '新增测试版联机功能，支持查找局域网游戏',
      '测试版桌面模式，支持自适应横竖屏',
      '计分历史页面改版，可自适应 UI',
      '全局支持走势图，数据点可显示多个重合点数据',
      '支持游戏中查看模板设置',
      '全新设计的局域网联机状态',
      '全新设计的消息系统'
    ],
    improvements: [
      '程序性能优化，页面切换加入动画',
      '设置页面调整，开放「桌面模式适配」和「通信测试&日志」选项',
      '修复联机初次同步问题',
      '其他 UI 改进与修复',
      '更新了 flutter 与其他依赖版本'
    ],
    fixes: []
  },
  {
    version: 'v0.9.14-rc1',
    date: '2024年9月',
    type: 'release',
    features: [
      '全新设计的计分流程及玩家管理',
      '优化搜索玩家界面，玩家头像可显示emoji',
      '优化中文字体显示效果',
      '设置&数据库重置功能',
      '数据迁移功能（仅Windows）',
      '斗地主计分模板，支持记录火箭、炸弹、春天等特殊牌型及倍率'
    ],
    improvements: [
      '使用 Riverpod 管理状态',
      '使用 sqlite 代替 hive',
      '初步程序日志系统',
      '其他 UI 改进'
    ],
    fixes: [
      '修复了多个已知问题',
      '提升了应用稳定性'
    ]
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
