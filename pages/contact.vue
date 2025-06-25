<template>
  <div>
    <!-- 页面头部 -->
    <section class="gradient-bg py-16">
      <div class="container-apple text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-on-scroll">
          联系反馈
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">
          我们重视每一个用户的声音，欢迎您的反馈和建议
        </p>
      </div>
    </section>

    <!-- 反馈渠道 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            反馈渠道
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactCard
                v-for="channel in contactChannels"
                :key="channel.title"
                :channel="channel"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 问题分类 -->
    <section class="py-20 bg-gray-50">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            问题分类
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <IssueTypeCard
                v-for="type in issueTypes"
                :key="type.title"
                :type="type"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="py-20 bg-white">
      <div class="container-apple">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-12 text-center animate-on-scroll">
            常见问题
          </h2>

          <div class="space-y-6">
            <FAQItem
                v-for="faq in commonFAQs"
                :key="faq.question"
                :question="faq.question"
                :answer="faq.answer"
                class="animate-on-scroll"
            />
          </div>
        </div>
      </div>
    </section>

<!--    &lt;!&ndash; 反馈表单 &ndash;&gt;-->
<!--    <section class="py-20 bg-gray-50">-->
<!--      <div class="container-apple">-->
<!--        <div class="max-w-2xl mx-auto">-->
<!--          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">-->
<!--            快速反馈-->
<!--          </h2>-->

<!--          <div class="card-apple p-8 animate-on-scroll">-->
<!--            <form @submit.prevent="submitFeedback" class="space-y-6">-->
<!--              <div>-->
<!--                <label for="feedback-type" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                  反馈类型-->
<!--                </label>-->
<!--                <select-->
<!--                    id="feedback-type"-->
<!--                    v-model="feedbackForm.type"-->
<!--                    class="w-full px-3 py-2 border border-gray-300 rounded-apple focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"-->
<!--                    required-->
<!--                >-->
<!--                  <option value="">请选择反馈类型</option>-->
<!--                  <option value="bug">Bug 报告</option>-->
<!--                  <option value="feature">功能建议</option>-->
<!--                  <option value="question">使用咨询</option>-->
<!--                  <option value="other">其他</option>-->
<!--                </select>-->
<!--              </div>-->

<!--              <div>-->
<!--                <label for="feedback-title" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                  标题-->
<!--                </label>-->
<!--                <input-->
<!--                    id="feedback-title"-->
<!--                    v-model="feedbackForm.title"-->
<!--                    type="text"-->
<!--                    class="w-full px-3 py-2 border border-gray-300 rounded-apple focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"-->
<!--                    placeholder="简要描述您的问题或建议"-->
<!--                    required-->
<!--                />-->
<!--              </div>-->

<!--              <div>-->
<!--                <label for="feedback-content" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                  详细描述-->
<!--                </label>-->
<!--                <textarea-->
<!--                    id="feedback-content"-->
<!--                    v-model="feedbackForm.content"-->
<!--                    rows="6"-->
<!--                    class="w-full px-3 py-2 border border-gray-300 rounded-apple focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"-->
<!--                    placeholder="请详细描述您遇到的问题或想法..."-->
<!--                    required-->
<!--                ></textarea>-->
<!--              </div>-->

<!--              <div>-->
<!--                <label for="feedback-contact" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                  联系方式（可选）-->
<!--                </label>-->
<!--                <input-->
<!--                    id="feedback-contact"-->
<!--                    v-model="feedbackForm.contact"-->
<!--                    type="text"-->
<!--                    class="w-full px-3 py-2 border border-gray-300 rounded-apple focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"-->
<!--                    placeholder="邮箱或其他联系方式，方便我们回复"-->
<!--                />-->
<!--              </div>-->

<!--              <div class="text-center">-->
<!--                <button-->
<!--                    type="submit"-->
<!--                    :disabled="isSubmitting"-->
<!--                    class="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"-->
<!--                >-->
<!--                  <span v-if="isSubmitting">提交中...</span>-->
<!--                  <span v-else>提交反馈</span>-->
<!--                </button>-->
<!--              </div>-->
<!--            </form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

    <!-- 社区链接 -->
    <section class="py-20 bg-primary-600">
      <div class="container-apple text-center">
        <div class="animate-on-scroll">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">
            加入我们的社区
          </h2>
          <p class="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            与其他用户交流经验，获取最新资讯
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                href="https://github.com/youzhiran/counters"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
                href="https://github.com/youzhiran/counters/issues"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center"
            >
              Issues
            </a>
            <a
                href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=4HLuYULaCCj5Pfkd6HasSmZqnq9FHZV3&authKey=X9KtEqWOptWr%2BXY3fTUx0%2BWyX%2FXZvzxFIeTKm4%2BhwltWhZm9LFVee%2Bd%2FM6L9d6Sy&noverify=0&group_code=706133694"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center"
            >
              QQ群
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO 配置
useSeoMeta({
  title: '联系反馈 - Counters 桌游计分器',
  description: '联系 Counters 开发团队，提交 Bug 报告、功能建议或使用咨询。多种反馈渠道，快速响应用户需求。',
  keywords: 'Counters联系方式,Bug报告,功能建议,用户反馈,技术支持'
})

// // 反馈表单
// const feedbackForm = reactive({
//   type: '',
//   title: '',
//   content: '',
//   contact: ''
// })

const isSubmitting = ref(false)

// 联系渠道
const contactChannels = [
  {
    title: 'GitHub Issues',
    description: '报告 Bug 或提出功能建议的最佳方式',
    icon: '🐛',
    link: 'https://github.com/youzhiran/counters/issues',
    action: '前往 GitHub'
  },
  {
    title: '开发者网站',
    description: '访问开发者个人网站了解更多信息',
    icon: '🌐',
    link: 'https://www.devyi.com',
    action: '访问网站'
  },
  {
    title: '项目仓库',
    description: '查看源代码，参与开源贡献',
    icon: '📦',
    link: 'https://github.com/youzhiran/counters',
    action: '查看源码'
  },
  {
    title: '用户社区',
    description: 'QQ群706133694，与其他用户交流使用经验',
    icon: '👥',
    link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=4HLuYULaCCj5Pfkd6HasSmZqnq9FHZV3&authKey=X9KtEqWOptWr%2BXY3fTUx0%2BWyX%2FXZvzxFIeTKm4%2BhwltWhZm9LFVee%2Bd%2FM6L9d6Sy&noverify=0&group_code=706133694',
    action: '加入讨论'
  }
]

// 问题类型
const issueTypes = [
  {
    title: 'Bug 报告',
    description: '应用崩溃、功能异常等问题',
    icon: '🐛',
    color: 'red'
  },
  {
    title: '功能建议',
    description: '新功能想法或改进建议',
    icon: '💡',
    color: 'yellow'
  },
  {
    title: '使用咨询',
    description: '使用方法、操作指导等问题',
    icon: '❓',
    color: 'blue'
  },
  {
    title: '合作洽谈',
    description: '商务合作、技术交流等',
    icon: '🤝',
    color: 'green'
  }
]

// 常见问题
const commonFAQs = [
  {
    question: '如何报告 Bug？',
    answer: '请在 GitHub Issues 中创建新的 issue，详细描述问题现象、复现步骤、设备信息等。这样有助于我们快速定位和修复问题。'
  },
  {
    question: '功能建议会被采纳吗？',
    answer: '我们会认真考虑每一个功能建议。优先级会根据用户需求度、技术可行性、开发成本等因素综合评估。'
  },
  {
    question: '多久能收到回复？',
    answer: '我们通常在 1-3 个工作日内回复 GitHub Issues。紧急问题会优先处理。'
  },
  {
    question: '可以参与开发吗？',
    answer: '当然可以！这是一个开源项目，欢迎提交 Pull Request。请先查看贡献指南了解开发规范。'
  }
]

// // 提交反馈
// const submitFeedback = async () => {
//   isSubmitting.value = true
//
//   try {
//     // 这里可以集成实际的反馈提交逻辑
//     // 比如发送到后端 API 或者生成 GitHub Issue
//
//     // 模拟提交过程
//     await new Promise(resolve => setTimeout(resolve, 2000))
//
//     // 重置表单
//     Object.assign(feedbackForm, {
//       type: '',
//       title: '',
//       content: '',
//       contact: ''
//     })
//
//     // 显示成功消息
//     alert('反馈提交成功！感谢您的建议。')
//
//   } catch (error) {
//     alert('提交失败，请稍后重试或直接在 GitHub Issues 中反馈。')
//   } finally {
//     isSubmitting.value = false
//   }
// }
</script>
