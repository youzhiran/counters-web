<template>
  <div class="card-apple p-6 text-center">
    <div class="text-3xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ platform }}
    </h3>
    <div class="text-primary-600 font-medium mb-3">
      {{ version }}
    </div>
    <ul class="space-y-1 text-sm text-gray-600">
      <li v-for="note in notes" :key="note">
        {{ note }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  platform: string
  icon: string
  version: string
  notes: string[]
}

defineProps<Props>()
</script>
