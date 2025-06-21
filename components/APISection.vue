<template>
  <div class="card-apple p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-3">
      {{ module.name }}
    </h3>
    <p class="text-gray-600 mb-4">
      {{ module.description }}
    </p>
    
    <div class="space-y-2">
      <h4 class="font-medium text-gray-900 mb-2">主要方法：</h4>
      <ul class="space-y-1">
        <li
          v-for="method in module.methods"
          :key="method"
          class="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded"
        >
          {{ method }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Module {
  name: string
  description: string
  methods: string[]
}

interface Props {
  module: Module
}

defineProps<Props>()
</script>
