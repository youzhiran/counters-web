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
      </div>
      <span class="text-gray-500 text-sm">
        {{ version.date }}
      </span>
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
}

interface Props {
  version: Version
}

defineProps<Props>()
</script>
