<template>
  <div class="card-apple p-6">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-apple flex items-center justify-center text-xl">
        {{ icon }}
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          {{ title }}
        </h3>
        <p class="text-gray-600 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()
</script>
