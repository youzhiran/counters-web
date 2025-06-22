<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-responsive-lg font-bold text-gray-900 mb-4 animate-on-scroll">
          关于我们
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          了解 Counters 的故事和我们的使命
        </p>
      </div>
    </section>

    <!-- 项目愿景 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto text-center">
          <div class="animate-on-scroll">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">
              我们的愿景
            </h2>
            <p class="text-xl text-gray-600 leading-relaxed mb-12">
              让桌游计分变得简单有趣，提升每一次聚会的游戏体验。我们相信技术应该服务于生活，让人们更好地享受与朋友家人的美好时光。
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisionCard
              v-for="vision in visions"
              :key="vision.title"
              :title="vision.title"
              :description="vision.description"
              :icon="vision.icon"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 开发理念 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            开发理念
          </h2>
          
          <div class="space-y-8">
            <PrincipleItem
              v-for="principle in principles"
              :key="principle.title"
              :title="principle.title"
              :description="principle.description"
              :icon="principle.icon"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 项目历程 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            项目历程
          </h2>
          
          <div class="space-y-8">
            <TimelineItem
              v-for="(milestone, index) in timeline"
              :key="milestone.date"
              :milestone="milestone"
              :isLast="index === timeline.length - 1"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 技术致谢 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            技术致谢
          </h2>
          
          <div class="card-apple p-8 animate-on-scroll">
            <div class="text-center mb-8">
              <p class="text-lg text-gray-600">
                Counters 的开发得到了众多开源项目和 AI 工具的支持
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">AI 辅助开发</h3>
                <div class="space-y-2 text-gray-600">
                  <p>• DeepSeek - 代码生成与优化</p>
                  <p>• Gemini - 架构设计建议</p>
                  <p>• GPT - 功能实现指导</p>
                  <p>• Claude - 代码审查与重构</p>
                  <p>• Cursor - 智能编程助手</p>
                  <p>• Augment - 代码上下文理解</p>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">开源社区</h3>
                <div class="space-y-2 text-gray-600">
                  <p>• Flutter 团队 - 跨平台框架</p>
                  <p>• Riverpod 社区 - 状态管理</p>
                  <p>• SQLite 项目 - 数据存储</p>
                  <p>• GitHub - 代码托管平台</p>
                  <p>• 图标资源来源：</p>
                  <p class="ml-4">- iconscout.com</p>
                  <p class="ml-4">- yesicon.app</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开源信息 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto text-center">
          <div class="animate-on-scroll">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">
              开源项目
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              Counters 是一个完全开源的项目，欢迎社区贡献和参与
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/youzhiran/counters"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary inline-flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                查看源码
              </a>
              <NuxtLink to="/docs" class="btn-secondary">
                技术文档
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系信息 -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-2xl font-bold text-white mb-4">
            联系我们
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="btn-primary bg-white text-primary-600 hover:bg-gray-50"
            >
              联系我们
            </NuxtLink>
            <a
              href="https://github.com/youzhiran/counters/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-apple bg-transparent border-white text-white hover:bg-white/10 shadow-apple hover:shadow-apple-lg"
            >
              问题反馈
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '关于我们 - Counters 桌游计分器',
  description: '了解 Counters 桌游计分器的开发故事、项目愿景和技术理念。开源项目，AI 辅助开发。',
  keywords: 'Counters关于,开源项目,AI辅助开发,桌游计分器,项目愿景'
})

// 愿景卡片
const visions = [
  {
    title: '简单易用',
    description: '直观的界面设计，让每个人都能轻松上手',
    icon: '🎯'
  },
  {
    title: '功能完整',
    description: '覆盖桌游计分的各种需求和场景',
    icon: '🔧'
  },
  {
    title: '持续改进',
    description: '基于用户反馈不断优化和完善',
    icon: '🚀'
  }
]

// 开发理念
const principles = [
  {
    title: '用户体验优先',
    description: '始终将用户需求放在首位，追求最佳的使用体验。每一个功能的设计都经过深思熟虑，确保简单直观。',
    icon: '👥'
  },
  {
    title: '开源透明',
    description: '完全开源的开发模式，代码公开透明。欢迎社区贡献，共同打造更好的产品。',
    icon: '🔓'
  },
  {
    title: '持续改进',
    description: '基于用户反馈和技术发展，持续优化产品功能和性能。永远保持学习和进步的心态。',
    icon: '📈'
  },
  {
    title: '社区驱动',
    description: '重视社区的力量，倾听用户声音。每一个建议都可能成为下一个重要功能。',
    icon: '🤝'
  }
]

// 项目历程
const timeline = [
  {
    date: '2024年初',
    title: '项目启动',
    description: '开始构思桌游计分应用的想法，确定技术方案'
  },
  {
    date: '2024年春',
    title: '核心功能开发',
    description: '完成基础计分功能，支持多种游戏类型'
  },
  {
    date: '2024年夏',
    title: '状态管理重构',
    description: '引入 Riverpod，使用 SQLite 替代 Hive'
  },
  {
    date: '2024年秋',
    title: '局域网功能',
    description: '实现局域网联机功能，支持多设备同步'
  },
  {
    date: '2024年冬',
    title: '界面优化',
    description: '全面优化用户界面，提升使用体验'
  },
  {
    date: '2025年',
    title: '持续发展',
    description: '继续完善功能，扩展更多游戏类型支持'
  }
]
</script>
