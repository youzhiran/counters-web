<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 通知横幅 - 固定定位 -->
    <NotificationBanner />

    <!-- 页面内容容器 - 添加顶部边距以避免被横幅遮挡 -->
    <div class="page-content">
      <!-- 导航栏 -->
      <AppHeader />

      <!-- 主要内容 -->
      <main>
        <slot />
      </main>

      <!-- 页脚 -->
      <AppFooter />
    </div>

    <!-- 回到顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
let observer: IntersectionObserver | null = null

// 简化的动画效果 - 确保内容始终可见
onMounted(() => {
  // 监听滚动事件，实现微妙的动画效果
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, observerOptions)

  // 初始化动画元素 - 所有元素默认可见
  const initializeAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => {
      // 确保所有元素都是可见的
      el.classList.add('in-view')
      if (observer) {
        observer.observe(el)
      }
    })
  }

  // 立即初始化，不延迟
  initializeAnimations()

  // 监听路由变化，确保新页面内容可见
  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => {
      // 在重新初始化前断开连接，以处理客户端导航
      if (observer) {
        observer.disconnect()
      }
      initializeAnimations()
    })
  })
})

// 清理函数
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* 页面内容容器 - 根据横幅高度动态调整顶部边距 */
.page-content {
  margin-top: var(--notification-banner-height, 0px);
  transition: margin-top 0.3s ease-in-out;
}
</style>
