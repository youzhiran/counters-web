const { generateDownloadData } = require('./generate-fallback-versions.js');

/**
 * 生成下载页面数据的独立脚本
 */
async function main() {
  try {
    console.log('🚀 开始生成下载页面数据...');
    await generateDownloadData();
    console.log('🎉 下载页面数据生成完成');
    process.exit(0);
  } catch (error) {
    console.error('💥 生成下载页面数据失败:', error);
    process.exit(1);
  }
}

// 运行脚本
main();
