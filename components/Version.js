import fs from 'fs'
import lodash from 'lodash'
import { fileURLToPath } from 'url'
import { join, dirname, basename } from 'path'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const getLine = function (line) {
  line = line.replace(/(^\s*\*|\r)/g, '')
  line = line.replace(/\s*`([^`]+`)/g, '<span class="cmd">$1')
  line = line.replace(/`\s*/g, '</span>')
  line = line.replace(/\s*\*\*([^*]+\*\*)/g, '<span class="strong">$1')
  line = line.replace(/\*\*\s*/g, '</span>')
  line = line.replace(/ⁿᵉʷ/g, '<span class="new"></span>')
  return line
}

const readLogFile = function (root, versionCount = 5) {
  const logPath = `${root}/CHANGELOG.md`
  let logs = {}
  const changelogs = []
  let version

  try {
    if (fs.existsSync(logPath)) {
      logs = fs.readFileSync(logPath, 'utf8') || ''
      logs = logs.split('\n')

      let temp = {}
      let lastLine = {}
      lodash.forEach(logs, (line) => {
        if (versionCount <= 0) {
          return false
        }
        const versionRet = /^#\s*([0-9a-zA-Z\\.~\s]+?)\s*$/.exec(line)
        if (versionRet && versionRet[1]) {
          const v = versionRet[1].trim()
          if (!version) {
            version = v
          } else {
            changelogs.push(temp)
            versionCount--
          }

          temp = {
            version: v,
            logs: [],
          }
        } else {
          if (!line.trim()) {
            return
          }
          if (/^\*/.test(line)) {
            lastLine = {
              title: getLine(line),
              logs: [],
            }
            temp.logs.push(lastLine)
          } else if (/^\s{2,}\*/.test(line)) {
            lastLine.logs.push(getLine(line))
          }
        }
      })
    }
  } catch (e) {
    // do nth
  }
  return { changelogs, version }
}

const pluginPath = join(__dirname, '..').replace(/\\/g, '/')

const pluginName = basename(pluginPath)

/**
 * @type {'Karin'|'Miao-Yunzai'|'Trss-Yunzai'|'Miao-Yunzai V4'}
 */
const BotName = (() => {
  if (/^karin/i.test(pluginName)) {
    return 'Karin'
  } else if (packageJson.dependencies.react) {
    return 'Miao-Yunzai V4'
  } else if (Array.isArray(global.Bot?.uin)) {
    return 'Trss-Yunzai'
  } else if (packageJson.dependencies.sequelize) {
    return 'Miao-Yunzai'
  } else {
    throw new Error('还有人玩Yunzai-Bot??')
  }
})()

const BotVersion = packageJson.version

const { changelogs, version } = readLogFile(pluginPath)

export default {
  version,
  changelogs,
  readLogFile,
  pluginName,
  pluginPath,
  BotName,
  BotVersion
}
