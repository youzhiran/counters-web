<template>
  <div class="card-apple-hover p-6 group">
    <div class="text-center mb-4">
      <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {{ icon }}
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ name }}
      </h3>
      <p class="text-gray-600 text-sm mb-4">
        {{ description }}
      </p>
    </div>
    
    <div class="space-y-2">
      <div
        v-for="feature in features"
        :key="feature"
        class="flex items-center text-sm text-gray-500"
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
  features: string[]
}

defineProps<Props>()
</script>
