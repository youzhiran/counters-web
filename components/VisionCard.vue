<template>
  <div class="card-apple p-6 text-center">
    <div class="text-4xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-3">
      {{ title }}
    </h3>
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
}

defineProps<Props>()
</script>
