// ESLint 配置文件
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  // 基础推荐配置
  js.configs.recommended,

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        IntersectionObserver: 'readonly',
        HTMLElement: 'readonly',
        NodeJS: 'readonly',
        // Node.js 环境
        process: 'readonly',
        // Nuxt 3 全局变量
        $fetch: 'readonly',
        navigateTo: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useNuxtApp: 'readonly',
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        nextTick: 'readonly',
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly'
      }
    },
    plugins: {
      vue
    },
    rules: {
      // Vue 基础规则
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        }
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 1 }
      }]
    }
  },

  // TypeScript 文件配置
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        // Node.js 环境
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Nuxt 3 全局变量
        defineNuxtConfig: 'readonly',
        defineEventHandler: 'readonly',
        useRuntimeConfig: 'readonly',
        setHeader: 'readonly',
        $fetch: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      // TypeScript 基础规则
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  // JavaScript 文件配置
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js 环境
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly'
      }
    },
    rules: {
      // 代码质量
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // 放宽一些规则用于配置文件
      'quotes': 'off',
      'semi': 'off'
    }
  },

  // 通用规则配置
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    rules: {
      // 环境相关
      'no-console': 'off', // 开发阶段允许 console
      'no-debugger': 'error',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // 代码风格 - 放宽要求
      'indent': ['error', 2],
      'eol-last': 'error',
      'no-trailing-spaces': 'error'
    }
  },

  // 忽略文件
  {
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      '*.min.js',
      '*.bundle.js',
      '.env*',
      'coverage/**',
      'public/**',
      'static/**',
      'auto-imports.d.ts',
      'components.d.ts',
      'scripts/**' // 忽略脚本文件
    ]
  }
]
