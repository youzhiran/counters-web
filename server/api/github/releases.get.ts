export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // GitHub 仓库信息
  const GITHUB_OWNER = 'youzhiran'
  const GITHUB_REPO = 'counters'
  const API_BASE = 'https://api.github.com'
  
  try {
    const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Counters-Website'
    }
    
    // 如果有 GitHub Token，添加到请求头
    if (config.githubToken) {
      headers['Authorization'] = `token ${config.githubToken}`
    }
    
    const response = await $fetch(url, {
      headers
    })
    
    return response
  } catch (error) {
    console.error('GitHub API 调用失败:', error)
    
    // 返回错误信息
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub releases'
    })
  }
})
