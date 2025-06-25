<template>
  <div class="card-apple p-6">
    <div class="flex items-center mb-4">
      <div class="w-10 h-10 bg-primary-100 rounded-apple flex items-center justify-center text-lg mr-3">
        {{ icon }}
      </div>
      <h3 class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h3>
    </div>

    <p class="text-gray-600 mb-4">
      {{ description }}
    </p>

    <div class="space-y-2">
      <div
        v-for="tip in tips"
        :key="tip"
        class="flex items-center text-sm text-gray-500"
      >
        <svg class="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 fill-current" viewBox="0 0 20 20">
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
        </svg>
        {{ tip }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  tips: string[]
}

defineProps<Props>()
</script>
