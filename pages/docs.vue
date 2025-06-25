<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-responsive-lg font-bold text-gray-900 mb-4 animate-on-scroll">
          技术文档
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          深入了解 Counters 的技术架构和开发细节
        </p>
      </div>
    </section>

    <!-- 技术架构 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            技术架构
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TechCard
              v-for="tech in techStack"
              :key="tech.name"
              :name="tech.name"
              :description="tech.description"
              :icon="tech.icon"
              :version="tech.version"
              :features="tech.features"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 开发环境 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            开发环境
          </h2>

          <div class="card-apple p-8 animate-on-scroll">
            <div class="space-y-8">
              <!-- 环境要求 -->
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">环境要求</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Flutter SDK</h4>
                    <p class="text-gray-600 text-sm">版本 ≥ 3.29.3</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Dart SDK</h4>
                    <p class="text-gray-600 text-sm">版本 ≥ 3.0.0</p>
                  </div>
                </div>
              </div>

              <!-- 构建脚本 -->
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">构建脚本</h3>
                <div class="bg-gray-900 rounded-apple p-4 overflow-x-auto">
                  <pre class="text-green-400 text-sm"><code># 当前平台构建
dart setup.dart

# 构建所有平台
dart setup.dart all

# 仅构建 Android
dart setup.dart android</code></pre>
                </div>
              </div>

              <!-- 依赖包 -->
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">主要依赖</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="dep in dependencies"
                    :key="dep.name"
                    class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span class="font-medium text-gray-900">{{ dep.name }}</span>
                    <span class="text-gray-600 text-sm">{{ dep.version }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API 参考 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            核心模块
          </h2>

          <div class="space-y-8">
            <APISection
              v-for="module in apiModules"
              :key="module.name"
              :module="module"
              class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 贡献指南 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            贡献指南
          </h2>

          <div class="card-apple p-8 animate-on-scroll">
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">如何参与</h3>
                <ol class="space-y-3 text-gray-600">
                  <li>1. Fork 项目到您的 GitHub 账户</li>
                  <li>2. 创建功能分支：<code class="bg-gray-100 px-2 py-1 rounded">git checkout -b feature/new-feature</code></li>
                  <li>3. 提交更改：<code class="bg-gray-100 px-2 py-1 rounded">git commit -am 'Add new feature'</code></li>
                  <li>4. 推送分支：<code class="bg-gray-100 px-2 py-1 rounded">git push origin feature/new-feature</code></li>
                  <li>5. 创建 Pull Request</li>
                </ol>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">代码规范</h3>
                <ul class="space-y-2 text-gray-600">
                  <li>• 遵循 Dart 官方代码风格</li>
                  <li>• 使用有意义的变量和函数命名</li>
                  <li>• 添加必要的注释和文档</li>
                  <li>• 确保代码通过所有测试</li>
                </ul>
              </div>

              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">问题反馈</h3>
                <p class="text-gray-600 mb-4">
                  发现 Bug 或有功能建议？请在 GitHub Issues 中提交：
                </p>
                <a
                  href="https://github.com/youzhiran/counters/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary inline-flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Issues
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '技术文档 - Counters 桌游计分器',
  description: 'Counters 技术文档，包括架构设计、开发环境、API 参考和贡献指南。',
  keywords: 'Counters技术文档,Flutter开发,开源项目,API文档,贡献指南'
})

// 技术栈
const techStack = [
  {
    name: 'Flutter',
    description: '跨平台 UI 框架',
    icon: '📱',
    version: '3.29.3+',
    features: ['跨平台支持', '高性能渲染', '热重载开发']
  },
  {
    name: 'Riverpod',
    description: '状态管理解决方案',
    icon: '🔄',
    version: '2.6.1',
    features: ['类型安全', '依赖注入', '测试友好']
  },
  {
    name: 'SQLite',
    description: '本地数据存储',
    icon: '🗄️',
    version: '2.4.1',
    features: ['轻量级', '事务支持', '跨平台']
  },
  {
    name: 'WebSocket',
    description: '局域网通信',
    icon: '🌐',
    version: '3.0.3',
    features: ['实时通信', '双向数据流', '断线重连']
  }
]

// 主要依赖
const dependencies = [
  { name: 'flutter_riverpod', version: '^2.6.1' },
  { name: 'sqflite', version: '^2.4.1' },
  { name: 'web_socket_channel', version: '^3.0.3' },
  { name: 'shared_preferences', version: '^2.5.2' },
  { name: 'package_info_plus', version: '^8.2.1' },
  { name: 'window_manager', version: '^0.5.0' },
  { name: 'file_picker', version: '^10.1.7' },
  { name: 'logger', version: '^2.5.0' }
]

// API 模块
const apiModules = [
  {
    name: '模板系统 (Template)',
    description: '游戏模板的创建、编辑和管理',
    methods: [
      'createTemplate() - 创建新模板',
      'updateTemplate() - 更新模板信息',
      'deleteTemplate() - 删除模板',
      'getTemplates() - 获取模板列表'
    ]
  },
  {
    name: '计分系统 (Score)',
    description: '游戏计分的核心逻辑',
    methods: [
      'startNewGame() - 开始新游戏',
      'addScore() - 添加得分',
      'updateScore() - 更新得分',
      'endGame() - 结束游戏'
    ]
  },
  {
    name: '玩家管理 (Player)',
    description: '玩家信息的增删改查',
    methods: [
      'addPlayer() - 添加玩家',
      'updatePlayer() - 更新玩家信息',
      'deletePlayer() - 删除玩家',
      'searchPlayers() - 搜索玩家'
    ]
  },
  {
    name: '局域网通信 (LAN)',
    description: '设备间的网络通信',
    methods: [
      'createHost() - 创建主机',
      'joinGame() - 加入游戏',
      'syncData() - 同步数据',
      'disconnect() - 断开连接'
    ]
  }
]
</script>
