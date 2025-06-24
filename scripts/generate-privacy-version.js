const fs = require('fs');
const path = require('path');

/**
 * 从隐私政策文件中提取日期并生成版本文件
 */
function generatePrivacyVersion() {
  try {
    // 读取隐私政策文件
    const privacyPolicyPath = path.join(__dirname, '../pages/privacy-policy.vue');
    const privacyContent = fs.readFileSync(privacyPolicyPath, 'utf8');
    
    // 使用正则表达式提取日期
    // 匹配格式：<strong>更新与生效日期：</strong> YYYY年MM月DD日
    const dateRegex = /<strong>更新与生效日期：<\/strong>\s*(\d{4})年(\d{1,2})月(\d{1,2})日/;
    const match = privacyContent.match(dateRegex);
    
    if (!match) {
      console.error('❌ 未能在隐私政策文件中找到日期信息');
      console.error('请确保日期格式为：<strong>更新与生效日期：</strong> YYYY年MM月DD日');
      process.exit(1);
    }
    
    const [, year, month, day] = match;
    const formattedDate = `${year}年${month}月${day}日`;
    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    console.log(`📅 提取到的日期: ${formattedDate}`);
    
    // 生成版本信息
    const versionInfo = {
      version: `${year}.${month}.${day}`,
      date: formattedDate,
      isoDate: isoDate,
      timestamp: new Date(isoDate).getTime(),
      generatedAt: new Date().toISOString()
    };
    
    // 生成HTML内容
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>隐私政策版本信息 - Counters</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        .version-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .version-number {
            font-size: 2em;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
        }
        .date-info {
            font-size: 1.2em;
            color: #6b7280;
            margin-bottom: 15px;
        }
        .meta-info {
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            padding: 15px;
            font-size: 0.9em;
            color: #6b7280;
        }
        .meta-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .meta-row:last-child {
            margin-bottom: 0;
        }
        .json-data {
            background: #1f2937;
            color: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9em;
            overflow-x: auto;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>隐私政策版本信息</h1>
        <p>Counters 桌游计分器</p>
    </div>
    
    <div class="version-card">
        <div class="version-number">v${versionInfo.version}</div>
        <div class="date-info">更新日期：${versionInfo.date}</div>
        
        <div class="meta-info">
            <div class="meta-row">
                <span><strong>版本号：</strong></span>
                <span>${versionInfo.version}</span>
            </div>
            <div class="meta-row">
                <span><strong>更新日期：</strong></span>
                <span>${versionInfo.date}</span>
            </div>
            <div class="meta-row">
                <span><strong>ISO 日期：</strong></span>
                <span>${versionInfo.isoDate}</span>
            </div>
            <div class="meta-row">
                <span><strong>时间戳：</strong></span>
                <span>${versionInfo.timestamp}</span>
            </div>
            <div class="meta-row">
                <span><strong>生成时间：</strong></span>
                <span>${versionInfo.generatedAt}</span>
            </div>
        </div>
    </div>
    
    <div class="json-data">
        <pre>${JSON.stringify(versionInfo, null, 2)}</pre>
    </div>
    
    <div class="footer">
        <p>此文件由脚本自动生成，基于 pages/privacy-policy.vue 中的日期信息</p>
        <p>访问 <a href="https://counters.devyi.com" target="_blank">counters.devyi.com</a> 了解更多</p>
    </div>
</body>
</html>`;
    
    // 确保目录存在
    const outputDir = path.join(__dirname, '../public/api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`📁 创建目录: ${outputDir}`);
    }
    // 同时生成 JSON 版本
    const jsonOutputPath = path.join(outputDir, 'private-version.json');
    fs.writeFileSync(jsonOutputPath, JSON.stringify(versionInfo, null, 2), 'utf8');
    console.log(`✅ 同时生成 JSON 文件: ${jsonOutputPath}`);
    
  } catch (error) {
    console.error('❌ 生成版本文件时发生错误:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('🚀 开始生成隐私政策版本文件...');
  generatePrivacyVersion();
}

module.exports = { generatePrivacyVersion };
