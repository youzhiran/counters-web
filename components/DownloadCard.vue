<template>
  <div class="card-apple-hover p-6 relative">
    <!-- 状态标签 -->
    <div
      v-if="platform.status === 'recommended'"
      class="absolute top-2 right-2 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10 shadow-lg"
    >
      推荐
    </div>
    <div
      v-else-if="platform.status === 'pending'"
      class="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full z-10 shadow-lg"
    >
      待适配
    </div>
    
    <div class="text-center">
      <!-- 平台图标 -->
      <div class="text-4xl mb-4">
        {{ platform.icon }}
      </div>
      
      <!-- 平台名称 -->
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        {{ platform.name }}
      </h3>
      
      <!-- 描述 -->
      <p class="text-gray-600 text-sm mb-4">
        {{ platform.description }}
      </p>
      
      <!-- 版本和大小信息 -->
      <div class="space-y-1 mb-6 text-sm text-gray-500">
        <div>{{ platform.version }}</div>
        <div>{{ platform.size }}</div>
      </div>
      
      <!-- 下载按钮 -->
      <a
        v-if="platform.status !== 'pending'"
        :href="platform.downloadUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'btn-apple w-full',
          platform.status === 'recommended'
            ? 'btn-primary'
            : 'btn-secondary'
        ]"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        下载
      </a>

      <!-- 待适配按钮 -->
      <button
        v-else
        disabled
        class="btn-apple w-full bg-gray-300 text-gray-500 cursor-not-allowed"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        敬请期待
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Platform {
  name: string
  icon: string
  description: string
  version: string
  size: string
  downloadUrl: string
  recommended: boolean
  status?: 'recommended' | 'pending' | 'available'
}

interface Props {
  platform: Platform
}

defineProps<Props>()
</script>
