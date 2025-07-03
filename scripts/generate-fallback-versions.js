const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * 比较两个语义化版本号
 * 返回值：a > b 返回 1，a < b 返回 -1，a = b 返回 0
 */
function compareVersions(a, b) {
  // 移除版本号前缀 'v'
  const cleanA = a.replace(/^v/, '');
  const cleanB = b.replace(/^v/, '');
  
  // 分离主版本号和预发布标识
  const parseVersion = (version) => {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
    if (!match) {
      // 如果无法解析，返回默认值
      return { major: 0, minor: 0, patch: 0, prerelease: '' };
    }
    
    const [, major, minor, patch, prerelease = ''] = match;
    return {
      major: parseInt(major, 10),
      minor: parseInt(minor, 10),
      patch: parseInt(patch, 10),
      prerelease
    };
  };
  
  const versionA = parseVersion(cleanA);
  const versionB = parseVersion(cleanB);
  
  // 比较主版本号
  if (versionA.major !== versionB.major) {
    return versionA.major - versionB.major;
  }
  
  // 比较次版本号
  if (versionA.minor !== versionB.minor) {
    return versionA.minor - versionB.minor;
  }
  
  // 比较修订版本号
  if (versionA.patch !== versionB.patch) {
    return versionA.patch - versionB.patch;
  }
  
  // 比较预发布版本
  if (versionA.prerelease && versionB.prerelease) {
    // 两个都是预发布版本，按字符串比较
    return versionA.prerelease.localeCompare(versionB.prerelease);
  } else if (versionA.prerelease && !versionB.prerelease) {
    // A 是预发布版本，B 是正式版本，A < B
    return -1;
  } else if (!versionA.prerelease && versionB.prerelease) {
    // A 是正式版本，B 是预发布版本，A > B
    return 1;
  }
  
  // 两个都是正式版本且相等
  return 0;
}

/**
 * 解析 release body 内容，提取功能分类
 */
function parseReleaseBody(body) {
  const features = [];
  const improvements = [];
  const fixes = [];

  if (!body) {
    return { features, improvements, fixes };
  }

  // 按行分割内容
  const lines = body.split('\n').map(line => line.trim()).filter(line => line);

  let currentSection = '';

  for (const line of lines) {
    // 检测章节标题
    if (line.match(/^#+\s*(新增|新功能|特性|features?)/i)) {
      currentSection = 'features';
      continue;
    } else if (line.match(/^#+\s*(.*改进|.*优化|improvements?|enhancements?)/i)) {
      currentSection = 'improvements';
      continue;
    } else if (line.match(/^#+\s*(.*修复|.*bug|fixes?)/i)) {
      currentSection = 'fixes';
      continue;
    }

    // 提取列表项
    const listMatch = line.match(/^[-*+]\s*(.+)/);
    if (listMatch) {
      const content = listMatch[1].trim();
      if (content) {
        switch (currentSection) {
        case 'features':
          features.push(content);
          break;
        case 'improvements':
          improvements.push(content);
          break;
        case 'fixes':
          fixes.push(content);
          break;
        default:
          // 如果没有明确分类，根据关键词判断
          if (content.match(/(新增|添加|支持|功能)/)) {
            features.push(content);
          } else if (content.match(/(修复|解决|bug)/i)) {
            fixes.push(content);
          } else {
            improvements.push(content);
          }
        }
      }
    }
  }

  return { features, improvements, fixes };
}

/**
 * 将 GitHub Release 转换为 Version 格式
 */
function convertReleaseToVersion(release) {
  const { features, improvements, fixes } = parseReleaseBody(release.body);

  // 格式化日期 - 包含完整的年月日信息
  const publishDate = new Date(release.published_at);
  const year = publishDate.getFullYear();
  const month = publishDate.getMonth() + 1;
  const day = publishDate.getDate();
  const formattedDate = `${year}年${month}月${day}日`;

  // 计算总下载量
  const downloadCount = release.assets.reduce((total, asset) => total + asset.download_count, 0);

  return {
    version: release.tag_name,
    date: formattedDate,
    type: release.prerelease ? 'beta' : 'release',
    features,
    improvements,
    fixes,
    url: release.html_url,
    author: release.author.login,
    downloadCount
  };
}

/**
 * 从 GitHub API 获取 releases 数据
 */
function fetchGitHubReleases() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/youzhiran/counters/releases',
      method: 'GET',
      headers: {
        'User-Agent': 'Counters-Website-Build',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    // 如果有 GitHub Token 环境变量，添加认证
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const releases = JSON.parse(data);
            resolve(releases);
          } else {
            reject(new Error(`GitHub API 返回状态码: ${res.statusCode}`));
          }
        } catch (error) {
          reject(new Error(`解析 GitHub API 响应失败: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`GitHub API 请求失败: ${error.message}`));
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('GitHub API 请求超时'));
    });

    req.end();
  });
}

/**
 * 生成备用版本数据的主函数
 */
async function generateFallbackVersions() {
  console.log('🚀 开始生成备用版本数据...');

  try {
    // 从 GitHub API 获取数据
    console.log('📡 正在从 GitHub API 获取 releases 数据...');
    const releases = await fetchGitHubReleases();
    console.log(`✅ 成功获取 ${releases.length} 个 releases`);

    // 过滤并转换数据
    const versions = releases
      .filter(release => !release.draft)
      .map(convertReleaseToVersion)
      .sort((a, b) => compareVersions(b.version, a.version)); // 降序排列

    console.log(`📋 处理后得到 ${versions.length} 个有效版本`);

    // 生成输出数据
    const outputData = {
      versions,
      generatedAt: new Date().toISOString(),
      source: 'github-api',
      count: versions.length
    };

    // 确保输出目录存在
    const outputDir = path.join(__dirname, '../public/api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    const outputPath = path.join(outputDir, 'fallback-versions.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');

    console.log(`✅ 备用版本数据已生成: ${outputPath}`);
    console.log(`📊 包含版本: ${versions.map(v => v.version).slice(0, 5).join(', ')}${versions.length > 5 ? '...' : ''}`);

  } catch (error) {
    console.error('❌ 从 GitHub API 获取数据失败:', error.message);
    console.log('🔄 使用降级方案生成基础备用数据...');

    // 降级方案：生成基础的备用数据
    const fallbackData = {
      versions: [
        {
          version: 'v0.10.8-beta',
          date: '2025年6月',
          type: 'beta',
          features: [
            '新增更多游戏模板支持',
            '改进联机稳定性'
          ],
          improvements: [
            '优化用户界面响应速度',
            '修复已知问题'
          ],
          fixes: []
        },
        {
          version: 'v0.10.7-rc3',
          date: '2025年6月',
          type: 'release',
          features: [
            '全新设计的局域网联机状态，信息更详细，支持重连、管理等功能',
            '全新设计的消息系统，支持消息堆叠，界面更美观'
          ],
          improvements: [
            '修复了联网、消息和动画的一些问题',
            '优化了用户界面和交互体验'
          ],
          fixes: []
        }
      ],
      generatedAt: new Date().toISOString(),
      source: 'fallback',
      count: 2,
      error: error.message
    };

    // 确保输出目录存在
    const outputDir = path.join(__dirname, '../public/api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入降级数据
    const outputPath = path.join(outputDir, 'fallback-versions.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2), 'utf8');

    console.log(`⚠️  已生成降级备用数据: ${outputPath}`);
  }
}

/**
 * 获取最新正式版本信息
 */
function getLatestReleaseVersion(versions) {
  // 查找最新的正式版本（非 beta/alpha）
  const releaseVersions = versions.filter(v => v.type === 'release');
  return releaseVersions.length > 0 ? releaseVersions[0] : versions[0];
}

/**
 * 生成下载页面数据
 */
async function generateDownloadData() {
  console.log('🚀 开始生成下载页面数据...');

  try {
    // 从 GitHub API 获取数据
    console.log('📡 正在从 GitHub API 获取 releases 数据...');
    const releases = await fetchGitHubReleases();
    console.log(`✅ 成功获取 ${releases.length} 个 releases`);

    // 过滤并转换数据
    const versions = releases
      .filter(release => !release.draft)
      .map(convertReleaseToVersion)
      .sort((a, b) => compareVersions(b.version, a.version)); // 降序排列

    console.log(`📋 处理后得到 ${versions.length} 个有效版本`);

    // 获取最新正式版本
    const latestRelease = getLatestReleaseVersion(versions);
    console.log(`🎯 最新正式版本: ${latestRelease.version}`);

    // 生成平台下载信息
    const platforms = [
      {
        name: 'Android',
        icon: '🤖',
        description: '推荐平台，功能完整',
        version: 'Android 5.0+',
        size: '约11MB',
        downloadUrl: `https://github.com/youzhiran/counters/releases/download/${latestRelease.version}/counters-${latestRelease.version.replace(/^v/, '')}-android-arm64-v8a.apk`,
        recommended: true,
        status: 'recommended'
      },
      {
        name: 'Windows',
        icon: '💻',
        description: '桌面端体验，功能完整',
        version: 'Windows 10+',
        size: '约13MB',
        downloadUrl: `https://github.com/youzhiran/counters/releases/download/${latestRelease.version}/counters-${latestRelease.version.replace(/^v/, '')}-windows-x64.zip`,
        recommended: true,
        status: 'recommended'
      },
      {
        name: 'macOS',
        icon: '🍎',
        description: '正在适配中',
        version: '~',
        size: '~',
        downloadUrl: `https://github.com/youzhiran/counters/releases/latest/download/counters-${latestRelease.version.replace(/^v/, '')}-macos.dmg`,
        recommended: false,
        status: 'pending'
      },
      {
        name: 'Linux',
        icon: '🐧',
        description: '正在适配中',
        version: '~',
        size: '~',
        downloadUrl: `https://github.com/youzhiran/counters/releases/latest/download/counters-${latestRelease.version.replace(/^v/, '')}-linux-amd64.tar.gz`,
        recommended: false,
        status: 'pending'
      }
    ];

    // 生成输出数据
    const outputData = {
      latestRelease,
      platforms,
      generatedAt: new Date().toISOString(),
      source: 'github-api'
    };

    // 确保输出目录存在
    const outputDir = path.join(__dirname, '../public/api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    const outputPath = path.join(outputDir, 'download-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');

    console.log(`✅ 下载页面数据已生成: ${outputPath}`);
    console.log(`📊 最新正式版本: ${latestRelease.version} (${latestRelease.date})`);

  } catch (error) {
    console.error('❌ 从 GitHub API 获取数据失败:', error.message);
    console.log('🔄 使用降级方案生成基础下载数据...');

    // 降级方案：生成基础的下载数据
    const fallbackLatestRelease = {
      version: 'v0.10.7-rc3',
      date: '2025年6月19日',
      type: 'release',
      features: [
        '全新设计的局域网联机状态，信息更详细，支持重连、管理等功能',
        '全新设计的消息系统，支持消息堆叠，界面更美观'
      ],
      improvements: [
        '修复了联网、消息和动画的一些问题',
        '优化了用户界面和交互体验'
      ],
      fixes: []
    };

    const fallbackPlatforms = [
      {
        name: 'Android',
        icon: '🤖',
        description: '推荐平台，功能完整',
        version: 'Android 5.0+',
        size: '约11MB',
        downloadUrl: 'https://github.com/youzhiran/counters/releases/download/v0.10.7-rc3/counters-0.10.7-rc3-android-arm64-v8a.apk',
        recommended: true,
        status: 'recommended'
      },
      {
        name: 'Windows',
        icon: '💻',
        description: '桌面端体验，功能完整',
        version: 'Windows 10+',
        size: '约13MB',
        downloadUrl: 'https://github.com/youzhiran/counters/releases/download/v0.10.7-rc3/counters-0.10.7-rc3-windows-x64.zip',
        recommended: true,
        status: 'recommended'
      },
      {
        name: 'macOS',
        icon: '🍎',
        description: '正在适配中',
        version: '~',
        size: '~',
        downloadUrl: 'https://github.com/youzhiran/counters/releases/latest/download/counters-0.10.7-rc3-macos.dmg',
        recommended: false,
        status: 'pending'
      },
      {
        name: 'Linux',
        icon: '🐧',
        description: '正在适配中',
        version: '~',
        size: '~',
        downloadUrl: 'https://github.com/youzhiran/counters/releases/latest/download/counters-0.10.7-rc3-linux-amd64.tar.gz',
        recommended: false,
        status: 'pending'
      }
    ];

    const fallbackData = {
      latestRelease: fallbackLatestRelease,
      platforms: fallbackPlatforms,
      generatedAt: new Date().toISOString(),
      source: 'fallback',
      error: error.message
    };

    // 确保输出目录存在
    const outputDir = path.join(__dirname, '../public/api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入降级数据
    const outputPath = path.join(outputDir, 'download-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2), 'utf8');

    console.log(`⚠️  已生成降级下载数据: ${outputPath}`);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  generateFallbackVersions()
    .then(() => {
      console.log('🎉 备用版本数据生成完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 生成备用版本数据失败:', error);
      process.exit(1);
    });
}

module.exports = { generateFallbackVersions, generateDownloadData, compareVersions };
