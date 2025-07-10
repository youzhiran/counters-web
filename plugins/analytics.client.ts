/**
 * Analytics 客户端插件 - 动态加载统计工具
 */

export default defineNuxtPlugin(() => {
  // 只在客户端执行
  if (import.meta.client) {
    const { initAllAnalytics } = useAnalytics()

    // 在DOM加载完成后初始化统计工具
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          initAllAnalytics()
        }, 100)
      })
    } else {
      // 如果DOM已经加载完成，直接初始化
      setTimeout(() => {
        initAllAnalytics()
      }, 100)
    }
  }
})
