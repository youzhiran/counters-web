<template>
  <div class="relative h-full">
    <!-- 步骤编号 -->
    <div class="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
      {{ step }}
    </div>

    <div class="card-apple p-6 text-center h-full flex flex-col">
      <!-- 图标 -->
      <div class="text-3xl mb-4">
        {{ icon }}
      </div>

      <!-- 标题 -->
      <h3 class="text-lg font-semibold text-gray-900 mb-3">
        {{ title }}
      </h3>

      <!-- 描述 -->
      <p class="text-gray-600 text-sm flex-1">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  step: number
  title: string
  description: string
  icon: string
}

defineProps<Props>()
</script>
