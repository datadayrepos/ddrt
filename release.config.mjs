import { yikoyu } from '@yikoyu/semantic-release-config'

const config = yikoyu({
  branches: ['master'] // 指定在哪个分支下要执行发布操作
})

// Fail before version/changelog/Git changes until this legacy route uses verified archives.
config.plugins.unshift('./scripts/semantic-release-packaging-guard.mjs')
export default config
