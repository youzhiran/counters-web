<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-responsive-lg font-bold text-gray-900 mb-4 animate-on-scroll">
          使用指南
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          从安装到精通，全面掌握 Counters 的使用方法
        </p>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">
            快速开始
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <GuideStep
                v-for="(step, index) in quickStartSteps"
                :key="step.title"
                :step="index + 1"
                :title="step.title"
                :description="step.description"
                :icon="step.icon"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 详细教程 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            详细教程
          </h2>

          <div class="space-y-12">
            <!-- 安装指南 -->
            <GuideSection
                title="安装指南"
                icon="📱"
                class="animate-on-scroll"
            >
              <div class="space-y-6">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">Android 安装</h4>
                  <ol class="space-y-2 text-gray-600 ml-4">
                    <li>1. 下载 APK 文件到您的 Android 设备</li>
                    <li>2. 在设置中允许"未知来源"应用安装</li>
                    <li>3. 点击 APK 文件进行安装</li>
                    <li>4. 安装完成后即可使用</li>
                  </ol>
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">Windows 安装</h4>
                  <ol class="space-y-2 text-gray-600 ml-4">
                    <li>1. 下载 ZIP 压缩包</li>
                    <li>2. 解压到任意文件夹</li>
                    <li>3. 双击 counters.exe 运行</li>
                    <li>4. 可创建桌面快捷方式</li>
                  </ol>
                </div>
              </div>
            </GuideSection>

            <!-- 模板管理 -->
            <GuideSection
                title="模板管理"
                icon="📋"
                class="animate-on-scroll"
            >
              <div class="space-y-4">
                <p class="text-gray-600">
                  模板是 Counters 的核心功能，定义了游戏的计分规则和玩家信息。
                </p>
                <div class="space-y-3">
                  <div>
                    <h4 class="font-medium text-gray-900">创建新模板</h4>
                    <p class="text-gray-600 text-sm">进入"模板"页面 → 点击需要的系统模板 → 点击“编辑模板” → 设置参数 →
                      点击右上角“另存为新模板”</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">编辑模板</h4>
                    <p class="text-gray-600 text-sm">选择模板卡片 → 点击"编辑模板" → 修改设置 → 保存模板</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">复制模板</h4>
                    <p class="text-gray-600 text-sm">可基于现有模板快速创建新模板，节省设置时间</p>
                  </div>
                </div>
              </div>
            </GuideSection>

            <!-- 玩家管理 -->
            <GuideSection
                title="玩家管理"
                icon="👥"
                class="animate-on-scroll"
            >
              <div class="space-y-4">
                <p class="text-gray-600">
                  高效管理玩家信息，支持头像设置和搜索功能。
                </p>
                <div class="space-y-3">
                  <div>
                    <h4 class="font-medium text-gray-900">添加玩家</h4>
                    <p class="text-gray-600 text-sm">进入"玩家"页面 → 点击"+"按钮 → 输入姓名 → 选择头像</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">设置头像</h4>
                    <p class="text-gray-600 text-sm">支持 Emoji 表情作为头像，个性化标识每个玩家</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">搜索玩家</h4>
                    <p class="text-gray-600 text-sm">使用搜索框快速找到特定玩家，支持姓名模糊匹配</p>
                  </div>
                </div>
              </div>
            </GuideSection>

            <!-- 局域网联机 -->
            <GuideSection
                title="局域网联机"
                icon="🌐"
                class="animate-on-scroll"
            >
              <div class="space-y-4">
                <p class="text-gray-600">
                  多设备实时同步计分，让所有人都能看到最新得分。
                </p>
                <div class="space-y-3">
                  <div>
                    <h4 class="font-medium text-gray-900">创建主机</h4>
                    <p class="text-gray-600 text-sm">任意计分 → 右上角选择"开启局域网联机" → 发现广播已同步开启</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">加入游戏</h4>
                    <p class="text-gray-600 text-sm">主页 → 点击"连接到局域网计分" →  找到主机 → 点击连接</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">同步计分</h4>
                    <p class="text-gray-600 text-sm">主机控制计分，客户端实时查看，支持断线重连</p>
                  </div>
                </div>
              </div>
            </GuideSection>
          </div>
        </div>
      </div>
    </section>

    <!-- 高级功能 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            高级功能
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdvancedFeature
                v-for="feature in advancedFeatures"
                :key="feature.title"
                :title="feature.title"
                :description="feature.description"
                :icon="feature.icon"
                :tips="feature.tips"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            常见问题
          </h2>

          <div class="space-y-6">
            <FAQItem
                v-for="faq in faqs"
                :key="faq.question"
                :question="faq.question"
                :answer="faq.answer"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 获取帮助 -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-2xl font-bold text-white mb-4">
            还有问题？
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            查看技术文档或联系我们获取更多帮助
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
                to="/docs"
                class="btn-primary bg-white text-primary-600 hover:bg-gray-50"
            >
              技术文档
            </NuxtLink>
            <NuxtLink
                to="/contact"
                class="btn-apple bg-transparent border-white text-white hover:bg-white/10 shadow-apple hover:shadow-apple-lg"
            >
              联系支持
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
  title: '使用指南 - Counters 桌游计分器',
  description: '详细的 Counters 使用指南，包括安装教程、模板管理、玩家管理、局域网联机等功能的使用方法。',
  keywords: 'Counters使用指南,桌游计分器教程,安装指南,模板管理,局域网联机'
})

// 快速开始步骤
const quickStartSteps = [
  {
    title: '下载安装',
    description: '选择适合的平台版本下载安装',
    icon: '📱'
  },
  {
    title: '创建模板',
    description: '设置游戏类型和计分规则',
    icon: '📋'
  },
  {
    title: '添加玩家',
    description: '录入玩家信息和头像',
    icon: '👥'
  },
  {
    title: '开始计分',
    description: '选择模板开始游戏计分',
    icon: '🎯'
  }
]

// 高级功能
const advancedFeatures = [
  {
    title: '自定义计分规则',
    description: '根据不同游戏需求设置个性化计分参数',
    icon: '⚙️',
    tips: ['设置目标分数', '配置底分倍率', '启用负分支持']
  },
  {
    title: '走势图分析',
    description: '可视化分析每个玩家的得分变化趋势',
    icon: '📊',
    tips: ['查看历史走势', '对比玩家表现', '分析游戏数据']
  },
  {
    title: '数据导入导出（计划中）',
    description: '备份和恢复游戏数据，支持设备间迁移',
    icon: '💾',
    tips: ['定期备份数据', '迁移到新设备', '分享游戏记录']
  },
  {
    title: '桌面模式',
    description: '大屏设备优化显示，提供更好的操作体验',
    icon: '🖥️',
    tips: ['自动适配屏幕', '侧边栏导航', '多窗口支持']
  }
]

// 常见问题
const faqs = [
  {
    question: '如何在 Android 上安装应用？',
    answer: '下载 APK 文件后，需要在设置中允许"未知来源"应用安装，然后点击 APK 文件进行安装。'
  },
  {
    question: '局域网联机需要什么条件？',
    answer: '所有设备需要连接到同一个 WiFi/热点 网络，主机创建游戏后，其他设备可以搜索并加入。'
  },
  {
    question: '数据会丢失吗？',
    answer: '所有数据都保存在本地 SQLite 数据库中，建议定期使用导出功能备份重要数据。'
  },
  {
    question: '支持多少个玩家？',
    answer: '根据不同模板支持的玩家数量也不同，但建议根据游戏类型和设备性能控制在合理范围内。'
  },
  {
    question: '如何更新应用？',
    answer: '访问 GitHub 发布页面下载最新版本，或在应用内检查更新通知。'
  }
]
</script>
