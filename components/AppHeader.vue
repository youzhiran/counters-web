<template>
  <header class="sticky z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 header-positioned">
    <nav class="container-apple">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">C</span>
          </div>
          <span class="text-xl font-semibold text-gray-900">Counters</span>
        </NuxtLink>
        
        <!-- 桌面导航 -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              'nav-link',
              currentPath === item.href ? 'nav-link-active' : ''
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        
        <!-- 下载按钮 -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink
            to="/download"
            class="btn-primary"
          >
            立即下载
          </NuxtLink>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      <!-- 移动端菜单 -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <div class="flex flex-col space-y-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="closeMobileMenu"
              :class="[
                'nav-link text-left',
                currentPath === item.href ? 'nav-link-active' : ''
              ]"
            >
              {{ item.name }}
            </NuxtLink>
            <div class="pt-4">
              <NuxtLink
                to="/download"
                @click="closeMobileMenu"
                class="btn-primary w-full"
              >
                立即下载
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: '首页', href: '/' },
  { name: '功能特性', href: '/features' },
  { name: '下载', href: '/download' },
  { name: '使用指南', href: '/guide' },
  { name: '技术文档', href: '/docs' },
  { name: '更新日志', href: '/changelog' },
  { name: '关于我们', href: '/about' },
  { name: '联系反馈', href: '/contact' }
]

// 安全获取当前路径
const currentPath = computed(() => {
  try {
    return useRoute().path
  } catch {
    return '/'
  }
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 监听路由变化，关闭移动端菜单 - 仅在客户端执行
onMounted(() => {
  try {
    watch(() => useRoute().path, () => {
      closeMobileMenu()
    })
  } catch (error) {
    console.warn('路由监听初始化失败:', error)
  }
})
</script>

<style scoped>
/* 头部导航定位 - 根据横幅高度动态调整 */
.header-positioned {
  top: var(--notification-banner-height, 0px);
  transition: top 0.3s ease-in-out;
}
</style>
