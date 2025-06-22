<template>
  <span
    class="text-carousel-wrapper"
    @mouseenter="pauseCarousel"
    @mouseleave="resumeCarousel"
  >
    <span v-if="isClient" class="text-carousel-inner">
      <Transition
        name="text-slide"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
      >
        <span
          :class="['text-gradient-dynamic', currentGradientClass]"
          :key="currentPhraseIndex"
          style="display: inline-block;"
        >
          {{ currentPhrase }}
        </span>
      </Transition>
    </span>
    <span v-else class="text-gradient-dynamic gradient-blue">
      简单有趣
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 定义组件属性
interface Props {
  phrases?: string[]
  gradientClasses?: string[]
  interval?: number
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  phrases: () => ['简单有趣', '无需纸笔', '安全可靠', '清爽无广', '直观清晰'],
  gradientClasses: () => ['gradient-blue', 'gradient-green', 'gradient-purple', 'gradient-orange', 'gradient-pink'],
  interval: 3000, // 每个文字显示3.0秒
  pauseOnHover: true
})

// 响应式数据
const currentPhraseIndex = ref(0)
const isClient = ref(false)
const isPaused = ref(false)

// 计算属性
const currentPhrase = computed(() => props.phrases[currentPhraseIndex.value])
const currentGradientClass = computed(() => props.gradientClasses[currentPhraseIndex.value])

// 轮播定时器
let intervalId: NodeJS.Timeout | null = null

// 切换到下一个短语
const nextPhrase = () => {
  if (isPaused.value || !isClient.value) return

  const oldIndex = currentPhraseIndex.value
  currentPhraseIndex.value = (currentPhraseIndex.value + 1) % props.phrases.length

  // 调试日志（仅在开发环境）
  if (process.dev) {
    console.log(`文字轮播: ${props.phrases[oldIndex]} -> ${props.phrases[currentPhraseIndex.value]}`)
    console.log('当前索引:', currentPhraseIndex.value)
    console.log('当前短语:', currentPhrase.value)
    console.log('当前颜色类:', currentGradientClass.value)
  }
}

// 启动轮播
const startCarousel = () => {
  if (!isClient.value || intervalId) return
  
  intervalId = setInterval(nextPhrase, props.interval)
}

// 停止轮播
const stopCarousel = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 暂停轮播（鼠标悬停）
const pauseCarousel = () => {
  if (props.pauseOnHover) {
    isPaused.value = true
  }
}

// 恢复轮播（鼠标离开）
const resumeCarousel = () => {
  if (props.pauseOnHover) {
    isPaused.value = false
  }
}

// 过渡事件处理（用于调试）
const onBeforeEnter = (el: Element) => {
  console.log('动画：准备进入', el.textContent)
}

const onEnter = (el: Element) => {
  console.log('动画：正在进入', el.textContent)
}

const onBeforeLeave = (el: Element) => {
  console.log('动画：准备离开', el.textContent)
}

const onLeave = (el: Element) => {
  console.log('动画：正在离开', el.textContent)
}

// 生命周期钩子
onMounted(() => {
  isClient.value = true
  // 延迟启动，确保组件完全挂载
  setTimeout(() => {
    startCarousel()
  }, 100)
})

onUnmounted(() => {
  stopCarousel()
})
</script>
