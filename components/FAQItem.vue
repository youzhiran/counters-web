<template>
  <div class="card-apple">
    <button
      @click="toggleOpen"
      class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <h3 class="text-lg font-medium text-gray-900 pr-4">
        {{ question }}
      </h3>
      <svg
        :class="[
          'w-5 h-5 text-gray-500 transition-transform duration-200',
          isOpen ? 'rotate-180' : ''
        ]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="px-6 pb-6">
        <div class="border-t border-gray-200 pt-4">
          <p class="text-gray-600 leading-relaxed">
            {{ answer }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  question: string
  answer: string
}

defineProps<Props>()

const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>
