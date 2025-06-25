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
        
        <!-- 下载按钮和 GitHub 按钮 -->
        <div class="hidden md:flex items-center space-x-3">
          <a
            :href="$config.public.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            title="查看 GitHub 仓库"
          >
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
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
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div class="pt-4 flex space-x-3">
              <a
                :href="$config.public.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeMobileMenu"
                class="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center"
                title="查看 GitHub 仓库"
              >
                <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <NuxtLink
                to="/download"
                @click="closeMobileMenu"
                class="btn-primary flex-1"
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
