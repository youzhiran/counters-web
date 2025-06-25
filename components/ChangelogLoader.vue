<template>
  <div class="space-y-8">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-12 h-12 mb-4">
        <div class="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
      <p class="text-gray-600">正在从 GitHub 获取最新更新日志...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-500 mb-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">获取更新日志失败</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="retry"
          class="btn-primary"
        >
          重试
        </button>
        <button
          @click="showFallback"
          class="btn-apple bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          查看本地版本
        </button>
      </div>
    </div>

    <!-- 成功状态 -->
    <div v-else-if="versions.length > 0">
      <!-- 刷新按钮 -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-sm text-gray-500">
          <span>最后更新: {{ lastUpdated }}</span>
          <span v-if="versions.length > 0" class="ml-4">
            共 {{ versions.length }} 个版本
          </span>
        </div>
        <button
          @click="refresh"
          :disabled="refreshing"
          class="btn-apple bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <svg 
            class="w-4 h-4 mr-2" 
            :class="{ 'animate-spin': refreshing }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ refreshing ? '刷新中...' : '刷新' }}
        </button>
      </div>

      <!-- 版本列表 -->
      <div class="space-y-12">
        <VersionCard
          v-for="version in versions"
          :key="version.version"
          :version="version"
          class="animate-on-scroll"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">暂无更新日志</h3>
        <p class="text-gray-600">未找到任何版本信息</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Version {
  version: string
  date: string
  type: 'release' | 'beta'
  features: string[]
  improvements: string[]
  fixes: string[]
  url?: string
  author?: string
  downloadCount?: number
}

interface Props {
  fallbackVersions?: Version[]
}

const props = defineProps<Props>()

// 从静态文件加载备用版本数据
const loadFallbackVersions = async (): Promise<Version[]> => {
  try {
    console.log('正在从静态文件加载备用版本数据...')
    const response = await $fetch<{
      versions: Version[]
      generatedAt: string
      source: string
      count: number
      error?: string
    }>('/api/fallback-versions.json')

    console.log(`从静态文件加载了 ${response.versions.length} 个版本，生成时间: ${response.generatedAt}`)
    return response.versions
  } catch (error) {
    console.error('加载静态备用版本数据失败:', error)
    // 如果静态文件也加载失败，使用传入的 props 数据
    return props.fallbackVersions || []
  }
}

// 状态管理
const loading = ref(true)
const refreshing = ref(false)
const error = ref<string | null>(null)
const versions = ref<Version[]>([])
const lastUpdated = ref<string>('')
const showingFallback = ref(false)

// GitHub API
console.log('初始化 GitHub API...')
const { getVersions } = useGitHubAPI()
console.log('GitHub API 初始化完成')

// 加载版本数据
const loadVersions = async () => {
  try {
    console.log('开始加载版本数据...')
    error.value = null
    const githubVersions = await getVersions()
    console.log('获取到的版本数据:', githubVersions)

    if (githubVersions.length > 0) {
      versions.value = githubVersions
      showingFallback.value = false
      console.log('使用 GitHub 数据，版本数量:', githubVersions.length)
    } else {
      // 如果 GitHub API 没有返回数据，使用静态备用数据
      const fallbackVersions = await loadFallbackVersions()
      versions.value = fallbackVersions
      showingFallback.value = true
      console.log('使用静态备用数据，版本数量:', fallbackVersions.length)
    }

    lastUpdated.value = new Date().toLocaleString('zh-CN')
  } catch (err) {
    console.error('加载版本信息失败:', err)
    error.value = err instanceof Error ? err.message : '网络连接失败，请检查网络后重试'

    // 出错时使用静态备用数据
    const fallbackVersions = await loadFallbackVersions()
    if (fallbackVersions.length > 0) {
      versions.value = fallbackVersions
      showingFallback.value = true
      error.value = null // 清除错误，因为我们有备用数据
      console.log('出错后使用静态备用数据，版本数量:', fallbackVersions.length)
    }
  } finally {
    loading.value = false
    refreshing.value = false
    console.log('加载完成，最终状态:', { loading: loading.value, error: error.value, versionsCount: versions.value.length })
  }
}

// 重试
const retry = () => {
  loading.value = true
  loadVersions()
}

// 刷新
const refresh = () => {
  refreshing.value = true
  loadVersions()
}

// 显示静态备用版本
const showFallback = async () => {
  try {
    const fallbackVersions = await loadFallbackVersions()
    if (fallbackVersions.length > 0) {
      versions.value = fallbackVersions
      showingFallback.value = true
      error.value = null
      lastUpdated.value = '静态备用数据'
    }
  } catch (err) {
    console.error('加载静态备用数据失败:', err)
    // 最后的降级方案：使用 props 数据
    if (props.fallbackVersions) {
      versions.value = props.fallbackVersions
      showingFallback.value = true
      error.value = null
      lastUpdated.value = '本地数据'
    }
  }
}

// 组件挂载时加载数据
onMounted(async () => {
  await loadVersions()
})
</script>
