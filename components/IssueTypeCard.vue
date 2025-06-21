<template>
  <div class="card-apple p-6 text-center">
    <div class="text-3xl mb-4">
      {{ type.icon }}
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-3">
      {{ type.title }}
    </h3>
    <p class="text-gray-600 text-sm">
      {{ type.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface IssueType {
  title: string
  description: string
  icon: string
  color: string
}

interface Props {
  type: IssueType
}

defineProps<Props>()
</script>
