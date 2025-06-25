interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  prerelease: boolean
  draft: boolean
  html_url: string
  author: {
    login: string
    avatar_url: string
    html_url: string
  }
  assets: Array<{
    name: string
    download_count: number
    browser_download_url: string
  }>
}

interface ParsedVersion {
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

export const useGitHubAPI = () => {
  const _config = useRuntimeConfig()

  // GitHub 仓库信息
  const _GITHUB_OWNER = 'youzhiran'
  const _GITHUB_REPO = 'counters'
  const _API_BASE = 'https://api.github.com'

  /**
   * 获取仓库的所有 releases
   */
  const fetchReleases = async (): Promise<GitHubRelease[]> => {
    try {
      console.log('开始获取 GitHub releases...')
      // 使用服务端 API 路由来获取 GitHub releases
      const response = await $fetch<GitHubRelease[]>('/api/github/releases')
      console.log('获取到 releases 数据:', response?.length || 0, '个版本')
      return response || []
    } catch (error) {
      console.error('获取 GitHub releases 失败:', error)
      throw error
    }
  }

  /**
   * 解析 release body 内容，提取功能分类
   */
  const parseReleaseBody = (body: string): { features: string[], improvements: string[], fixes: string[] } => {
    const features: string[] = []
    const improvements: string[] = []
    const fixes: string[] = []

    if (!body) {
      return {features, improvements, fixes}
    }

    // 按行分割内容
    const lines = body.split('\n').map(line => line.trim()).filter(line => line)

    let currentSection = ''

    for (const line of lines) {
      // 检测章节标题
      if (line.match(/^#+\s*(新增|新功能|特性|features?)/i)) {
        currentSection = 'features'
        continue
      } else if (line.match(/^#+\s*(.*改进|.*优化|improvements?|enhancements?)/i)) {
        currentSection = 'improvements'
        continue
      } else if (line.match(/^#+\s*(.*修复|.*bug|fixes?)/i)) {
        currentSection = 'fixes'
        continue
      }

      // 提取列表项
      const listMatch = line.match(/^[-*+]\s*(.+)/)
      if (listMatch) {
        const content = listMatch[1].trim()
        if (content) {
          switch (currentSection) {
          case 'features':
            features.push(content)
            break
          case 'improvements':
            improvements.push(content)
            break
          case 'fixes':
            fixes.push(content)
            break
          default:
            // 如果没有明确分类，根据关键词判断
            if (content.match(/(新增|添加|支持|功能)/)) {
              features.push(content)
            } else if (content.match(/(修复|解决|bug)/i)) {
              fixes.push(content)
            } else {
              improvements.push(content)
            }
          }
        }
      }
    }

    return {features, improvements, fixes}
  }

  /**
   * 将 GitHub Release 转换为 Version 格式
   */
  const convertReleaseToVersion = (release: GitHubRelease): ParsedVersion => {
    const {features, improvements, fixes} = parseReleaseBody(release.body)

    // 格式化日期 - 包含完整的年月日信息
    const publishDate = new Date(release.published_at)
    const year = publishDate.getFullYear()
    const month = publishDate.getMonth() + 1
    const day = publishDate.getDate()
    const formattedDate = `${year}年${month}月${day}日`

    // 计算总下载量
    const downloadCount = release.assets.reduce((total, asset) => total + asset.download_count, 0)

    return {
      version: release.tag_name,
      date: formattedDate,
      type: release.prerelease ? 'beta' : 'release',
      features,
      improvements,
      fixes,
      url: release.html_url,
      author: release.author.login,
      downloadCount
    }
  }

  /**
   * 比较两个语义化版本号
   * 返回值：a > b 返回 1，a < b 返回 -1，a = b 返回 0
   */
  const compareVersions = (a: string, b: string): number => {
    // 移除版本号前缀 'v'
    const cleanA = a.replace(/^v/, '')
    const cleanB = b.replace(/^v/, '')

    // 分离主版本号和预发布标识
    const parseVersion = (version: string) => {
      const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
      if (!match) {
        // 如果无法解析，返回默认值
        return { major: 0, minor: 0, patch: 0, prerelease: '' }
      }

      const [, major, minor, patch, prerelease = ''] = match
      return {
        major: parseInt(major, 10),
        minor: parseInt(minor, 10),
        patch: parseInt(patch, 10),
        prerelease
      }
    }

    const versionA = parseVersion(cleanA)
    const versionB = parseVersion(cleanB)

    // 比较主版本号
    if (versionA.major !== versionB.major) {
      return versionA.major - versionB.major
    }

    // 比较次版本号
    if (versionA.minor !== versionB.minor) {
      return versionA.minor - versionB.minor
    }

    // 比较修订版本号
    if (versionA.patch !== versionB.patch) {
      return versionA.patch - versionB.patch
    }

    // 比较预发布版本
    if (versionA.prerelease && versionB.prerelease) {
      // 两个都是预发布版本，按字符串比较
      return versionA.prerelease.localeCompare(versionB.prerelease)
    } else if (versionA.prerelease && !versionB.prerelease) {
      // A 是预发布版本，B 是正式版本，A < B
      return -1
    } else if (!versionA.prerelease && versionB.prerelease) {
      // A 是正式版本，B 是预发布版本，A > B
      return 1
    }

    // 两个都是正式版本且相等
    return 0
  }

  /**
   * 获取并解析所有版本信息
   */
  const getVersions = async (): Promise<ParsedVersion[]> => {
    try {
      const releases = await fetchReleases()

      // 过滤掉草稿版本，转换格式，按版本号排序（最新版本在前）
      return releases
        .filter(release => !release.draft)
        .map(convertReleaseToVersion)
        .sort((a, b) => {
          // 使用语义化版本号比较，降序排列（最新版本在前）
          return compareVersions(b.version, a.version)
        })
    } catch (error) {
      console.error('获取版本信息失败:', error)
      return []
    }
  }

  return {
    fetchReleases,
    getVersions,
    parseReleaseBody,
    convertReleaseToVersion,
    compareVersions
  }
}
