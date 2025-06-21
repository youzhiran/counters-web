<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div class="flex flex-col items-center space-y-4">
      <!-- 旋转的 Logo -->
      <div class="relative">
        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center animate-pulse">
          <span class="text-white font-bold text-lg">C</span>
        </div>
        <div class="absolute inset-0 w-12 h-12 border-2 border-primary-200 border-t-primary-600 rounded-lg animate-spin"></div>
      </div>
      
      <!-- 加载文本 -->
      <p class="text-sm text-gray-600 font-medium">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件不需要额外的逻辑，纯展示组件
</script>
