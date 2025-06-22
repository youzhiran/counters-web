<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-responsive-lg font-bold text-gray-900 mb-4 animate-on-scroll">
          下载 Counters
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          选择适合您设备的版本，开始您的桌游计分之旅
        </p>
      </div>
    </section>

    <!-- 当前版本信息 -->
    <section class="py-12 bg-white">
      <div class="container-apple">
        <div class="text-center mb-12 animate-on-scroll">
          <div
              class="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
            最新版本
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            v0.10.7-rc3
          </h2>
          <p class="text-gray-600">
            发布时间：2025年6月
          </p>
        </div>
      </div>
    </section>

    <!-- 下载选项 -->
    <section class="py-16 bg-gray-50">
      <div class="container-apple">
        <!-- 增加上边距为推荐标签提供空间 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <DownloadCard
              v-for="platform in platforms"
              :key="platform.name"
              :platform="platform"
              class="animate-on-scroll"
          />
        </div>
      </div>
    </section>

    <!-- 版本说明 -->
    <section class="py-16 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">
            版本说明
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center animate-on-scroll">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">预正式版 (rc)</h3>
              <p class="text-gray-600 text-sm">最稳定的版本，推荐普通用户使用</p>
            </div>

            <div class="text-center animate-on-scroll">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">测试版 (beta)</h3>
              <p class="text-gray-600 text-sm">新功能预览，可能存在问题</p>
            </div>

            <div class="text-center animate-on-scroll">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">开发版 (alpha)</h3>
              <p class="text-gray-600 text-sm">最新功能，仅供测试</p>
            </div>
          </div>

          <!-- 更新内容 -->
          <div class="bg-gray-50 rounded-apple-lg p-8 animate-on-scroll">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">v0.10.7-rc3 更新内容</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">✨ 新增特性</h4>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• 全新设计的局域网联机状态，信息更详细，支持重连、管理等功能</li>
                  <li>• 全新设计的消息系统，支持消息堆叠，界面更美观</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-2">🔧 其他改进</h4>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• 修复了联网、消息和动画的一些问题</li>
                  <li>• 优化了用户界面和交互体验</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--    &lt;!&ndash; 系统要求 &ndash;&gt;-->
    <!--    <section class="py-16 bg-gray-50">-->
    <!--      <div class="container-apple">-->
    <!--        <div class="max-w-4xl mx-auto">-->
    <!--          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">-->
    <!--            系统要求-->
    <!--          </h2>-->
    <!--          -->
    <!--          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">-->
    <!--            <SystemRequirement-->
    <!--              v-for="requirement in systemRequirements"-->
    <!--              :key="requirement.platform"-->
    <!--              :platform="requirement.platform"-->
    <!--              :icon="requirement.icon"-->
    <!--              :version="requirement.version"-->
    <!--              :notes="requirement.notes"-->
    <!--              class="animate-on-scroll"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <!-- 安装指南 -->
    <section class="py-16 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 animate-on-scroll">
            需要帮助？
          </h2>
          <p class="text-gray-600 mb-8 animate-on-scroll">
            查看详细的安装指南和常见问题解答
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <NuxtLink to="/guide" class="btn-primary">
              查看安装指南
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-secondary">
              联系技术支持
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 导入 Platform 类型
interface Platform {
  name: string
  icon: string
  description: string
  version: string
  size: string
  downloadUrl: string
  recommended: boolean
  status: 'recommended' | 'pending' | 'available'
}

// SEO 配置
useSeoMeta({
  title: '下载 - Counters 桌游计分器',
  description: '下载 Counters 桌游计分器，支持 Android、Windows、macOS、Linux 多平台。最新版本 v0.10.7-rc3，免费开源。',
  keywords: 'Counters下载,桌游计分器下载,Android,Windows,macOS,Linux,多平台应用'
})

const {$config} = useNuxtApp()

// 平台下载信息
const platforms: Platform[] = [
  {
    name: 'Android',
    icon: '🤖',
    description: '推荐平台，功能最完整',
    version: 'Android 5.0+',
    size: '约11MB',
    downloadUrl: `${$config.public.releasesUrl}/latest/download/counters-0.10.7-rc3-android.apk`,
    recommended: true,
    status: 'recommended'
  },
  {
    name: 'Windows',
    icon: '🪟',
    description: '桌面端体验，功能完整',
    version: 'Windows 10+',
    size: '约13MB',
    downloadUrl: `${$config.public.releasesUrl}/latest/download/counters-0.10.7-rc3-windows-amd64.zip`,
    recommended: true,
    status: 'recommended'
  },
  {
    name: 'macOS',
    icon: '🍎',
    description: '正在适配中',
    version: 'macOS 10.14+',
    size: '~',
    downloadUrl: `${$config.public.releasesUrl}/latest/download/counters-0.10.7-rc3-macos.dmg`,
    recommended: false,
    status: 'pending'
  },
  {
    name: 'Linux',
    icon: '🐧',
    description: '正在适配中',
    version: 'Ubuntu 18.04+',
    size: '~',
    downloadUrl: `${$config.public.releasesUrl}/latest/download/counters-0.10.7-rc3-linux-amd64.tar.gz`,
    recommended: false,
    status: 'pending'
  }
]

</script>
