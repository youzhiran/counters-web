<template>
  <div class="card-apple p-6">
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-apple flex items-center justify-center text-xl mr-4">
        {{ icon }}
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ name }}
        </h3>
        <p class="text-gray-600 text-sm">
          {{ description }}
        </p>
      </div>
    </div>
    
    <div class="mb-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
        {{ version }}
      </span>
    </div>
    
    <div class="space-y-2">
      <div
        v-for="feature in features"
        :key="feature"
        class="flex items-center text-sm text-gray-600"
      >
        <svg class="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        {{ feature }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  description: string
  icon: string
  version: string
  features: string[]
}

defineProps<Props>()
</script>
