<template>
  <div class="card-apple p-6">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-apple flex items-center justify-center text-xl mr-4">
        {{ icon }}
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ title }}
        </h3>
        <span
          :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            statusClasses[status]
          ]"
        >
          {{ statusText[status] }}
        </span>
      </div>
    </div>

    <p class="text-gray-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  status: 'planned' | 'in-progress' | 'considering'
}

defineProps<Props>()

const statusClasses = {
  'planned': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'considering': 'bg-gray-100 text-gray-800'
}

const statusText = {
  'planned': '计划中',
  'in-progress': '开发中',
  'considering': '考虑中'
}
</script>
