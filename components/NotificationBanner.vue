<template>
  <Transition
      name="notification-banner"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
  >
    <div
        v-if="isVisible"
        ref="bannerRef"
        class="fixed top-0 left-0 right-0 bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white shadow-lg z-[9999]"
    >
      <div class="container-apple">
        <div class="flex items-center justify-between py-3 sm:py-4 gap-3">
          <!-- 通知内容 -->
          <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <!-- 警告图标 -->
            <div class="flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- 通知文本 -->
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm md:text-base font-medium text-center sm:text-left">
                {{ message }}
              </p>
            </div>
          </div>

          <!-- 关闭按钮 -->
          <button
              v-if="closable"
              @click="closeBanner"
              class="flex-shrink-0 p-1 sm:p-1.5 rounded-lg hover:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
              aria-label="关闭通知横幅"
              title="关闭通知"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 底部装饰线 -->
      <div
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 opacity-80"/>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: '本网站使用 AI 辅助生成；得益计分 为个人业余开发，现处于开发阶段，仍可能出现错误，欢迎试用并提供反馈。',
  closable: true
})

// 横幅可见状态 - 每次页面加载时都默认显示
const isVisible = ref(true)
const bannerRef = ref<HTMLElement>()

// 关闭横幅 - 仅在当前会话中隐藏，页面刷新后重新显示
const closeBanner = () => {
  isVisible.value = false
}

// 提供重新显示横幅的方法
const showBanner = () => {
  isVisible.value = true
}

// 计算横幅高度并更新CSS变量
const updateBannerHeight = () => {
  if (process.client && bannerRef.value && isVisible.value) {
    const height = bannerRef.value.offsetHeight
    document.documentElement.style.setProperty('--notification-banner-height', `${height}px`)
  } else {
    document.documentElement.style.setProperty('--notification-banner-height', '0px')
  }
}

// 监听横幅可见性变化，更新高度
watch(isVisible, () => {
  nextTick(() => {
    updateBannerHeight()
  })
})

// 组件挂载后更新高度
onMounted(() => {
  nextTick(() => {
    updateBannerHeight()
  })

  // 监听窗口大小变化，重新计算高度
  window.addEventListener('resize', updateBannerHeight)
})

// 组件卸载时清理
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', updateBannerHeight)
    document.documentElement.style.setProperty('--notification-banner-height', '0px')
  }
})

// 暴露方法供父组件使用
defineExpose({
  showBanner,
  closeBanner
})
</script>

<style scoped>
/* 确保横幅在移动设备上的可读性和适当的间距 */
@media (max-width: 640px) {
  .container-apple {
    @apply px-3;
  }
}

/* 确保文本在小屏幕上不会被截断 */
@media (max-width: 480px) {
  .container-apple {
    @apply px-2;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .container-apple {
    @apply px-1.5;
  }
}

/* 增强关闭按钮的可访问性 */
button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* 确保文本在移动设备上有足够的行高和换行 */
@media (max-width: 640px) {
  p {
    line-height: 1.4;
    white-space: normal;
    word-break: break-word;
    hyphens: auto;
  }
}

/* 优化移动端的垂直间距 */
@media (max-width: 480px) {
  .flex.justify-between {
    @apply py-2.5;
  }

  p {
    font-size: 0.75rem;
    line-height: 1.3;
  }
}
</style>
