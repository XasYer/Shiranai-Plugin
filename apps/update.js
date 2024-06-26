import { Version, App } from '#components'

export const app = {
  id: 'update',
  name: '更新插件'
}

export const rule = {
  update: {
    reg: /^#希腊奶(强制)?更新$/,
    fnc: e => {
      let msg = e.msg.replace('希腊奶', '')
      switch (Version.BotName) {
        case 'Karin':
          msg += Version.pluginName.replace(/karin-plugin-/i, '')
          break
        case 'Miao-Yunzai V4':
          return
        default:
          msg += Version.pluginName
      }
      e.msg = msg
      return false
    }
  }
}

export const update = new App(app, rule).create()
