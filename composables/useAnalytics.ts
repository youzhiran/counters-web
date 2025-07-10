/**
 * Analytics composable - 管理统计工具的启用/禁用状态
 */

export const useAnalytics = () => {
  // 存储键名
  const ANALYTICS_STORAGE_KEY = 'counters_analytics_enabled'
  
  // 默认启用统计（保持现有行为）
  const analyticsEnabled = ref(true)
  
  /**
   * 初始化analytics设置
   */
  const initAnalytics = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY)
        if (stored !== null) {
          analyticsEnabled.value = JSON.parse(stored)
        }
      } catch (error) {
        console.warn('读取analytics设置失败:', error)
        // 保持默认值
      }
    }
  }
  
  /**
   * 设置analytics启用状态
   */
  const setAnalyticsEnabled = (enabled: boolean) => {
    analyticsEnabled.value = enabled
    
    if (import.meta.client) {
      try {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(enabled))
        
        // 如果禁用了统计，清理现有的统计数据
        if (!enabled) {
          clearAnalyticsData()
        }
        
        // 重新加载页面以应用设置
        window.location.reload()
      } catch (error) {
        console.warn('保存analytics设置失败:', error)
      }
    }
  }
  
  /**
   * 清理统计数据
   */
  const clearAnalyticsData = () => {
    if (import.meta.client) {
      try {
        // 清理Google Analytics数据
        if (window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': 'denied'
          })
        }
        
        // 清理Microsoft Clarity数据
        if (window.clarity) {
          window.clarity('stop')
        }
        
        // 清理相关cookies
        const cookiesToClear = [
          '_ga',
          '_ga_GM1PW1LS2G',
          '_gid',
          '_gat',
          '_gat_gtag_GM1PW1LS2G',
          'CLID'
        ]
        
        cookiesToClear.forEach(cookieName => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
        })
        
      } catch (error) {
        console.warn('清理analytics数据失败:', error)
      }
    }
  }
  
  /**
   * 加载Google Analytics
   */
  const loadGoogleAnalytics = () => {
    if (import.meta.client && analyticsEnabled.value) {
      try {
        // 加载gtag脚本
        const script1 = document.createElement('script')
        script1.async = true
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-GM1PW1LS2G'
        document.head.appendChild(script1)
        
        // 初始化gtag
        const script2 = document.createElement('script')
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GM1PW1LS2G');
        `
        document.head.appendChild(script2)
        
        console.log('Google Analytics已加载')
      } catch (error) {
        console.warn('加载Google Analytics失败:', error)
      }
    }
  }
  
  /**
   * 加载Microsoft Clarity
   */
  const loadMicrosoftClarity = () => {
    if (import.meta.client && analyticsEnabled.value) {
      try {
        const script = document.createElement('script')
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "s3qts1pxwm");
        `
        document.head.appendChild(script)
        
        console.log('Microsoft Clarity已加载')
      } catch (error) {
        console.warn('加载Microsoft Clarity失败:', error)
      }
    }
  }
  
  /**
   * 初始化所有统计工具
   */
  const initAllAnalytics = () => {
    if (analyticsEnabled.value) {
      loadGoogleAnalytics()
      loadMicrosoftClarity()
    } else {
      console.log('Analytics已禁用，跳过加载统计工具')
    }
  }
  
  // 在客户端初始化时读取设置
  if (import.meta.client) {
    initAnalytics()
  }
  
  return {
    analyticsEnabled: readonly(analyticsEnabled),
    setAnalyticsEnabled,
    initAllAnalytics,
    loadGoogleAnalytics,
    loadMicrosoftClarity,
    clearAnalyticsData
  }
}

// 全局类型声明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    clarity?: (...args: any[]) => void
  }
}
