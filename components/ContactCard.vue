<template>
  <div class="card-apple-hover p-6">
    <div class="text-center">
      <div class="text-4xl mb-4">
        {{ channel.icon }}
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-3">
        {{ channel.title }}
      </h3>
      <p class="text-gray-600 mb-6">
        {{ channel.description }}
      </p>
      <template v-if="channel.disabled">
        <button
          disabled
          class="btn-apple w-full bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          {{ channel.action }}
        </button>
      </template>
      <template v-else>
        <a
          :href="channel.link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary w-full"
        >
          {{ channel.action }}
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Channel {
  title: string
  description: string
  icon: string
  link: string
  action: string
  disabled?: boolean
}

interface Props {
  channel: Channel
}

defineProps<Props>()
</script>
