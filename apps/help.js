import { toButton } from '../models/button/index.js'
// import { App } from '#components'

export const app = {
  id: 'help',
  name: '帮助'
}

export const rule = {
  help: {
    reg: '^#?(Shiranai|希腊奶|小游戏)(帮助|菜单|help)$',
    fnc: e => {
      if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
        return false
      }
      e.toQQBotMD = true
      const buttons = [
        [
          { text: '连连看', callback: '#连连看' },
          { text: '数字游戏', callback: '#数字游戏' },
          { text: '消灭星星', callback: '#消灭星星' },
          { text: '井字棋', callback: '#井字棋' }
        ],
        [
          { text: '金币大作战', callback: '#金币大作战' },
          { text: '重生模拟器', callback: '#remake' }
        ]
      ]
      return e.reply(['\r#小游戏帮助', toButton(buttons, 'QQBot')])
    }
  }
}

// export const help = new App(app, rule).create()
