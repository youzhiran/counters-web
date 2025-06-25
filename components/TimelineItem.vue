<template>
  <div class="flex items-start space-x-4">
    <!-- 时间线点 -->
    <div class="flex-shrink-0 relative">
      <div class="w-4 h-4 bg-primary-600 rounded-full"/>
      <div
        v-if="!isLast"
        class="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-300"
      />
    </div>

    <!-- 内容 -->
    <div class="flex-1 pb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ milestone.title }}
        </h3>
        <span class="text-sm text-gray-500 mt-1 sm:mt-0">
          {{ milestone.date }}
        </span>
      </div>
      <p class="text-gray-600">
        {{ milestone.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Milestone {
  date: string
  title: string
  description: string
}

interface Props {
  milestone: Milestone
  isLast: boolean
}

defineProps<Props>()
</script>
