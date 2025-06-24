<template>
  <div>
    <!-- Hero Section -->
    <section class="gradient-bg py-20 lg:py-32">
      <div class="container-apple">
        <div class="text-center animate-on-scroll">
          <h1 class="text-responsive-xl font-bold text-gray-900 mb-6">
            让桌游计分变得
            <TextCarousel />
          </h1>
          <p class="text-responsive-md text-gray-600 mb-8 max-w-3xl mx-auto">
            支持多种桌游类型，局域网实时同步，让每一局游戏都精彩纷呈
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/download" class="btn-primary text-lg px-8 py-4">
              立即下载
            </NuxtLink>
            <NuxtLink to="/features" class="btn-secondary text-lg px-8 py-4">
              查看功能
            </NuxtLink>
          </div>
        </div>
        
        <!-- 应用截图 -->
        <div class="mt-16 animate-on-scroll">
          <div class="relative max-w-4xl mx-auto">
            <div class="bg-white rounded-apple-xl shadow-apple-xl p-8">
              <NuxtImg
                src="/screenshots/main-interface.webp"
                alt="Counters 主界面截图"
                class="w-full h-auto rounded-apple-lg"
                loading="eager"
                placeholder
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能预览 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-responsive-lg font-bold text-gray-900 mb-4">
            强大的功能特性
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            专为桌游爱好者设计，提供完整的计分解决方案
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            v-for="feature in coreFeatures"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- 支持的游戏类型 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-responsive-lg font-bold text-gray-900 mb-4">
            支持多种游戏类型
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            从经典扑克到现代桌游，满足不同场景的计分需求
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameTypeCard
            v-for="game in gameTypes"
            :key="game.name"
            :name="game.name"
            :description="game.description"
            :icon="game.icon"
            :features="game.features"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="animate-on-scroll">
            <div class="text-4xl font-bold text-primary-600 mb-2">4+</div>
            <div class="text-lg text-gray-600">支持游戏类型</div>
          </div>
          <div class="animate-on-scroll">
            <div class="text-4xl font-bold text-primary-600 mb-2">多平台</div>
            <div class="text-lg text-gray-600">Android/Windows (待适配：macOS/Linux)</div>
          </div>
          <div class="animate-on-scroll">
            <div class="text-4xl font-bold text-primary-600 mb-2">开源</div>
            <div class="text-lg text-gray-600">GitHub 开源项目</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-responsive-lg font-bold text-white mb-4">
            准备开始你的桌游之旅？
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            立即下载 Counters，体验专业的桌游计分功能
          </p>
          <NuxtLink
            to="/download"
            class="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-apple-lg hover:bg-gray-50 transition-colors duration-200 shadow-apple-lg"
          >
            免费下载
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 核心功能
const coreFeatures = [
  {
    icon: '🎮',
    title: '多游戏支持',
    description: '支持扑克牌、斗地主、麻将、计数器等多种游戏类型'
  },
  {
    icon: '📊',
    title: '智能走势图',
    description: '直观查看得分变化趋势，分析游戏表现'
  },
  {
    icon: '🌐',
    title: '局域网联机',
    description: '多设备实时同步，支持主机/客户端模式'
  },
  {
    icon: '👥',
    title: '玩家管理',
    description: '头像设置、搜索功能、历史记录管理'
  }
]

// 游戏类型
const gameTypes = [
  {
    name: '计分扑克牌',
    description: '经典扑克牌计分',
    icon: '🃏',
    features: ['目标分数设置', '负分支持', '快速计分']
  },
  {
    name: '斗地主',
    description: '专业斗地主计分',
    icon: '🀄',
    features: ['倍率计算', '特殊牌型', '底分设置']
  },
  {
    name: '麻将',
    description: '精确到小数点',
    icon: '🎯',
    features: ['两位小数', '精确计分', '多人支持']
  },
  {
    name: '点击计数器',
    description: '简单快速计数',
    icon: '🔢',
    features: ['一键+1', '快速操作', '实时统计']
  }
]
</script>
