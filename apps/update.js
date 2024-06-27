import { Version, App } from '#components'
import { logger } from '#lib'

export const app = {
  id: 'update',
  name: '更新插件',
  priority: 50
}

export const rule = {
  update: {
    reg: /^#希腊奶(插件)?(强制)?更新(日志)?$/,
    fnc: update
  }
}

export const updateApp = new App(app, rule).create()

function update (e) {
  let msg = e.msg
  if (!msg.incudes('日志') && !e.isMaster) return false
  if (msg.includes('强制') && msg.includes('日志')) {
    msg = msg.replace('强制', '')
  }
  msg = msg.replace(/希腊奶(插件)?/, '')
  switch (Version.BotName) {
    case 'Karin':
      msg += Version.pluginName.replace('karin-plugin-', '')
      break
    case 'Miao-Yunzai V4':
      logger.warn('暂不支持Yunzai V4更新')
      return true
    default:
      msg += Version.pluginName
  }
  e.msg = msg
  return false
}
