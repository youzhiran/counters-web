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

interface LatestRelease {
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

interface DownloadData {
  latestRelease: LatestRelease
  platforms: Platform[]
  generatedAt: string
  source: string
  error?: string
}

export const useDownloadData = () => {
  const loading = ref(true)
  const error = ref<string | null>(null)
  const downloadData = ref<DownloadData | null>(null)
  const showingFallback = ref(false)

  /**
   * 从静态文件加载下载数据
   */
  const loadStaticDownloadData = async (): Promise<DownloadData | null> => {
    try {
      console.log('正在从静态文件加载下载数据...')
      const response = await $fetch<DownloadData>('/api/download-data.json')
      console.log(`从静态文件加载下载数据成功，生成时间: ${response.generatedAt}`)
      return response
    } catch (error) {
      console.error('加载静态下载数据失败:', error)
      return null
    }
  }

  /**
   * 获取硬编码的回退数据
   */
  const getFallbackDownloadData = (): DownloadData => {
    return {
      latestRelease: {
        version: 'v0.10.7-rc3',
        date: '2025年6月19日',
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
      platforms: [
        {
          name: 'Android',
          icon: '🤖',
          description: '推荐平台，功能完整',
          version: 'Android 5.0+',
          size: '约11MB',
          downloadUrl: 'https://github.com/youzhiran/counters/releases/download/v0.10.7-rc3/counters-0.10.7-rc3-android-arm64-v8a.apk',
          recommended: true,
          status: 'recommended'
        },
        {
          name: 'Windows',
          icon: '💻',
          description: '桌面端体验，功能完整',
          version: 'Windows 10+',
          size: '约13MB',
          downloadUrl: 'https://github.com/youzhiran/counters/releases/download/v0.10.7-rc3/counters-0.10.7-rc3-windows-x64.zip',
          recommended: true,
          status: 'recommended'
        },
        {
          name: 'HarmonyOS',
          icon: '🌸',
          description: '邀请测试中，欢迎反馈问题！',
          version: 'HarmonyOS 5.0+',
          size: '约11MB',
          downloadUrl: 'https://appgallery.huawei.com/link/invite-test-wap?taskId=54a9d0077917cb3b02f0fb3f7d372eae&invitationCode=ANB4gPOnAbY',
          recommended: false,
          status: 'available'
        },
        {
          name: 'Linux',
          icon: '🐧',
          description: '正在适配中',
          version: '~',
          size: '~',
          downloadUrl: 'https://github.com/youzhiran/counters/releases/latest/download/counters-0.10.7-rc3-linux-amd64.tar.gz',
          recommended: false,
          status: 'pending'
        }
      ],
      generatedAt: new Date().toISOString(),
      source: 'hardcoded-fallback'
    }
  }

  /**
   * 加载下载数据
   */
  const loadDownloadData = async () => {
    try {
      console.log('开始加载下载数据...')
      error.value = null
      loading.value = true

      // 尝试从静态文件加载
      const staticData = await loadStaticDownloadData()

      if (staticData) {
        downloadData.value = staticData
        showingFallback.value = staticData.source === 'fallback'
        console.log('使用静态下载数据，来源:', staticData.source)
      } else {
        // 如果静态文件加载失败，使用硬编码回退数据
        downloadData.value = getFallbackDownloadData()
        showingFallback.value = true
        console.log('使用硬编码回退下载数据')
      }

    } catch (err) {
      console.error('加载下载数据失败:', err)
      error.value = err instanceof Error ? err.message : '加载下载数据失败'

      // 出错时使用硬编码回退数据
      downloadData.value = getFallbackDownloadData()
      showingFallback.value = true
      error.value = null // 清除错误，因为我们有回退数据
      console.log('出错后使用硬编码回退下载数据')
    } finally {
      loading.value = false
    }
  }

  /**
   * 获取最新正式版本信息
   */
  const getLatestRelease = computed(() => {
    return downloadData.value?.latestRelease || null
  })

  /**
   * 获取平台下载信息
   */
  const getPlatforms = computed(() => {
    return downloadData.value?.platforms || []
  })

  /**
   * 检查是否正在显示回退数据
   */
  const isShowingFallback = computed(() => {
    return showingFallback.value
  })

  return {
    loading: readonly(loading),
    error: readonly(error),
    downloadData: readonly(downloadData),
    getLatestRelease,
    getPlatforms,
    isShowingFallback,
    loadDownloadData
  }
}
