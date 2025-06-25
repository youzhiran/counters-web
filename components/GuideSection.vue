<template>
  <div class="card-apple p-8">
    <div class="flex items-center mb-6">
      <div class="w-12 h-12 bg-primary-100 rounded-apple flex items-center justify-center text-xl mr-4">
        {{ icon }}
      </div>
      <h3 class="text-xl font-semibold text-gray-900">
        {{ title }}
      </h3>
    </div>

    <div class="prose prose-gray max-w-none">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
}

defineProps<Props>()
</script>
