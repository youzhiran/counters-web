<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          🔧 高级设置
        </h1>
        <p class="text-lg text-gray-600">
          管理网站的高级设置和隐私选项
        </p>
      </div>

      <!-- 设置卡片 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="space-y-8">
          
          <!-- Analytics 设置 -->
          <div class="border-b border-gray-200 pb-8">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  📊 数据统计
                </h3>
                <p class="text-gray-600 mb-4">
                  控制是否启用Google Analytics和Microsoft Clarity数据统计。
                  禁用后将不会收集任何访问数据，并清理已有的统计cookies。
                </p>
                
                <!-- 当前状态显示 -->
                <div class="flex items-center space-x-2 mb-4">
                  <span class="text-sm text-gray-500">当前状态:</span>
                  <ClientOnly>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        analyticsEnabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ analyticsEnabled ? '✅ 已启用' : '❌ 已禁用' }}
                    </span>
                    <template #fallback>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        ⏳ 加载中...
                      </span>
                    </template>
                  </ClientOnly>
                </div>

                <!-- 统计工具列表 -->
                <div class="text-sm text-gray-500 space-y-1">
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Google Analytics (G-GM1PW1LS2G)
                  </div>
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Microsoft Clarity (s3qts1pxwm)
                  </div>
                </div>
              </div>
              
              <!-- 切换开关 -->
              <div class="ml-6">
                <ClientOnly>
                  <button
                    @click="toggleAnalytics"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                      analyticsEnabled ? 'bg-primary-600' : 'bg-gray-200'
                    ]"
                    role="switch"
                    :aria-checked="analyticsEnabled"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        analyticsEnabled ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                  <template #fallback>
                    <div class="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent bg-gray-200">
                      <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 translate-x-0" />
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </div>
          </div>

          <!-- 其他设置占位 -->
          <div class="border-b border-gray-200 pb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              🔮 更多设置
            </h3>
            <p class="text-gray-600">
              更多高级设置功能正在开发中...
            </p>
          </div>

        </div>
      </div>

      <!-- 警告信息 -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              注意事项
            </h3>
            <div class="mt-2 text-sm text-yellow-700">
              <ul class="list-disc list-inside space-y-1">
                <li>修改统计设置后页面将自动刷新以应用更改</li>
                <li>禁用统计不会影响网站的正常功能</li>
                <li>设置保存在浏览器本地存储中</li>
                <li>清除浏览器数据会重置这些设置</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
definePageMeta({
  title: '高级设置 - Counters',
  description: '管理Counters网站的高级设置和隐私选项'
})

// SEO设置
useSeoMeta({
  title: '高级设置 - Counters',
  description: '管理Counters网站的高级设置和隐私选项',
  robots: 'noindex, nofollow' // 不让搜索引擎索引此页面
})

// 使用analytics composable
const { analyticsEnabled, setAnalyticsEnabled } = useAnalytics()

// 客户端水合状态
const isHydrated = ref(false)

// 在客户端挂载后设置水合状态
onMounted(() => {
  isHydrated.value = true
})

// 切换统计功能
const toggleAnalytics = () => {
  const newState = !analyticsEnabled.value

  // 确认对话框
  const message = newState
    ? '确定要启用数据统计吗？这将加载Google Analytics和Microsoft Clarity。'
    : '确定要禁用数据统计吗？这将清理所有统计cookies并停止数据收集。'

  if (confirm(message)) {
    setAnalyticsEnabled(newState)
  }
}
</script>

<style scoped>

</style>
