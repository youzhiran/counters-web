<template>
  <div class="card-apple p-8">
    <!-- 版本头部 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ version.version }}
        </h3>
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            version.type === 'release'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          ]"
        >
          {{ version.type === 'release' ? '预正式版' : '测试版' }}
        </span>
        <!-- GitHub 链接 -->
        <a
          v-if="version.url"
          :href="version.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          title="在 GitHub 上查看"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      <div class="text-right">
        <div class="text-gray-500 text-sm">
          {{ version.date }}
        </div>
        <!-- 下载统计 -->
        <div v-if="version.downloadCount !== undefined" class="text-xs text-gray-400 mt-1">
          下载量: {{ version.downloadCount.toLocaleString() }}
        </div>
      </div>
    </div>

    <!-- 更新内容 -->
    <div class="space-y-6">
      <!-- 新增特性 -->
      <div v-if="version.features.length > 0">
        <h4 class="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <span class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
            ✨
          </span>
          新增特性
        </h4>
        <ul class="space-y-2">
          <li
            v-for="feature in version.features"
            :key="feature"
            class="flex items-start text-gray-600"
          >
            <span class="text-green-500 mr-2 mt-1">•</span>
            {{ feature }}
          </li>
        </ul>
      </div>

      <!-- 功能改进 -->
      <div v-if="version.improvements.length > 0">
        <h4 class="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <span class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            🔧
          </span>
          功能改进
        </h4>
        <ul class="space-y-2">
          <li
            v-for="improvement in version.improvements"
            :key="improvement"
            class="flex items-start text-gray-600"
          >
            <span class="text-blue-500 mr-2 mt-1">•</span>
            {{ improvement }}
          </li>
        </ul>
      </div>

      <!-- 问题修复 -->
      <div v-if="version.fixes.length > 0">
        <h4 class="flex items-center text-lg font-semibold text-gray-900 mb-3">
          <span class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
            🐛
          </span>
          问题修复
        </h4>
        <ul class="space-y-2">
          <li
            v-for="fix in version.fixes"
            :key="fix"
            class="flex items-start text-gray-600"
          >
            <span class="text-red-500 mr-2 mt-1">•</span>
            {{ fix }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Version {
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

interface Props {
  version: Version
}

defineProps<Props>()
</script>
