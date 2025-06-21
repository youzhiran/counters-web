<template>
  <div class="card-apple-hover p-6 text-center group">
    <div class="text-4xl mb-4 group-hover:animate-bounce-gentle">
      {{ icon }}
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-3">
      {{ title }}
    </h3>
    <p class="text-gray-600 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>
