#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Counters 官方网站设置脚本')
console.log('================================')

// 检查 Node.js 版本
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

if (majorVersion < 18) {
  console.error('❌ 需要 Node.js 18 或更高版本')
  console.error(`当前版本: ${nodeVersion}`)
  process.exit(1)
}

console.log(`✅ Node.js 版本检查通过: ${nodeVersion}`)

// 检查包管理器
let packageManager = 'npm'
if (fs.existsSync('yarn.lock')) {
  packageManager = 'yarn'
} else if (fs.existsSync('pnpm-lock.yaml')) {
  packageManager = 'pnpm'
}

console.log(`📦 使用包管理器: ${packageManager}`)

// 安装依赖
console.log('📥 安装依赖...')
try {
  execSync(`${packageManager} install`, { stdio: 'inherit' })
  console.log('✅ 依赖安装完成')
} catch (error) {
  console.error('❌ 依赖安装失败')
  process.exit(1)
}

// 复制环境变量文件
if (!fs.existsSync('.env')) {
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env')
    console.log('✅ 环境变量文件已创建')
  }
}

// 创建必要的目录
const directories = [
  'public/screenshots',
  'public/icons'
]

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ 创建目录: ${dir}`)
  }
})

console.log('')
console.log('🎉 设置完成！')
console.log('')
console.log('下一步:')
console.log(`1. 运行开发服务器: ${packageManager} run dev`)
console.log('2. 添加应用截图到 public/screenshots/ 目录')
console.log('3. 替换 favicon.ico 和其他图标文件')
console.log('4. 根据需要修改 .env 文件中的配置')
console.log('')
console.log('📚 更多信息请查看 README.md')
