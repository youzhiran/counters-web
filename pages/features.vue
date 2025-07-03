<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-on-scroll">
          功能特性
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          探索 Counters 的强大功能，为您的桌游体验提供完整解决方案
        </p>
      </div>
    </section>

    <!-- 计分系统 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-on-scroll">
            <h2 class="text-responsive-md font-bold text-gray-900 mb-6">
              专业的计分系统
            </h2>
            <div class="space-y-6">
              <FeatureItem
                icon="🎯"
                title="多种游戏模板支持"
                description="内置扑克牌、斗地主、麻将、计数器等多种游戏模板，满足不同桌游需求"
              />
              <FeatureItem
                icon="⚙️"
                title="自定义计分规则"
                description="灵活设置目标分数、底分、倍率等参数，适应各种游戏规则"
              />
              <FeatureItem
                icon="⚡"
                title="实时得分计算"
                description="快速输入分数，自动计算，支持负分和小数计分，还可查看计分走势"
              />
              <FeatureItem
                icon="📚"
                title="历史记录管理"
                description="完整保存每局游戏记录，支持查看和分析"
              />
            </div>
          </div>
          <div class="animate-on-scroll">
            <div class="bg-gray-50 rounded-apple-xl p-8">
              <NuxtImg
                src="/screenshots/scoring-system.webp"
                alt="计分系统界面"
                class="w-full h-auto rounded-apple-lg shadow-apple"
                placeholder
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 局域网联机 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 animate-on-scroll">
            <div class="bg-white rounded-apple-xl p-8">
              <NuxtImg
                src="/screenshots/main-interface.webp"
                alt="局域网联机界面"
                class="w-full h-auto rounded-apple-lg shadow-apple"
                placeholder
              />
            </div>
          </div>
          <div class="order-1 lg:order-2 animate-on-scroll">
            <h2 class="text-responsive-md font-bold text-gray-900 mb-6">
              局域网联机功能
            </h2>
            <div class="space-y-6">
              <FeatureItem
                icon="🏠"
                title="主机/客户端模式"
                description="一台设备作为主机控制计分，其他设备作为客户端实时查看"
              />
              <FeatureItem
                icon="🔄"
                title="实时数据同步"
                description="所有连接设备同步显示最新得分，确保信息一致性"
              />
              <FeatureItem
                icon="🔗"
                title="断线重连机制"
                description="网络中断后自动重连，保证游戏连续性"
              />
              <FeatureItem
                icon="📱"
                title="多设备支持"
                description="支持手机、平板、电脑等不同设备混合连接"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 用户体验 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-on-scroll">
            <h2 class="text-responsive-md font-bold text-gray-900 mb-6">
              优秀的用户体验
            </h2>
            <div class="space-y-6">
              <FeatureItem
                icon="📱"
                title="响应式设计"
                description="完美适配手机、平板、电脑等不同屏幕尺寸"
              />
              <FeatureItem
                icon="🖥️"
                title="桌面/移动端适配"
                description="智能切换界面布局，提供最佳操作体验"
              />
              <FeatureItem
                icon="🎨"
                title="主题字体自定义"
                description="多种颜色主题和字体选择，个性化定制界面"
              />
              <FeatureItem
                icon="✨"
                title="流畅动画效果"
                description="精心设计的过渡动画，提升操作流畅度"
              />
            </div>
          </div>
          <div class="animate-on-scroll">
            <div class="bg-gray-50 rounded-apple-xl p-8">
              <NuxtImg
                src="/screenshots/user-experience.webp"
                alt="用户体验界面"
                class="w-full h-auto rounded-apple-lg shadow-apple"
                placeholder
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据管理 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="text-center mb-16 animate-on-scroll">
          <h2 class="text-responsive-md font-bold text-gray-900 mb-4">
            完善的数据管理
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            安全可靠的数据存储和管理功能
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="🗄️"
            title="SQLite本地存储"
            description="使用SQLite数据库安全存储所有游戏数据"
            class="animate-on-scroll"
          />
          <FeatureCard
            icon="📤"
            title="数据导入导出"
            description="支持数据导入导出，轻松迁移到新设备"
            class="animate-on-scroll"
          />
          <FeatureCard
            icon="🔄"
            title="备份恢复功能"
            description="自动备份游戏数据，防止数据丢失"
            class="animate-on-scroll"
          />
          <FeatureCard
            icon="🔒"
            title="隐私保护"
            description="所有数据本地存储，保护用户隐私安全"
            class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            体验这些强大功能
          </h2>
          <p class="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            立即下载 Counters，享受专业的桌游计分体验
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/download"
              class="btn-primary bg-white text-primary-600 hover:bg-gray-50"
            >
              立即下载
            </NuxtLink>
            <NuxtLink
              to="/guide"
              class="btn-apple bg-transparent border-white text-white hover:bg-white/10 shadow-apple hover:shadow-apple-lg"
            >
              查看使用指南
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
  title: '功能特性 - Counters 桌游计分器',
  description: '探索 Counters 的强大功能：多游戏支持、局域网联机、智能走势图、玩家管理等专业计分功能。',
  keywords: '桌游计分功能,局域网联机,计分走势图,多游戏支持,数据管理'
})
</script>
