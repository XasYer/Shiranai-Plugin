import LinkGame from '../models/link/index.js'
import { toButton } from '../models/common.js'

const GAME = {}

export class LinkGameLite extends plugin {
  constructor () {
    super({
      name: '轻量版连连看',
      dsc: '轻量版连连看',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^[#/](结束)?连连看$/,
          fnc: 'start'
        },
        {
          reg: /^(\s*连线\s*\d+,\d+\s*)+$/,
          fnc: 'link'
        }
      ]
    })
  }

  async start (e) {
    if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
      return false
    }
    e.toQQBotMD = true
    if (e.msg.includes('结束')) {
      delete GAME[e.group_id]
      return e.reply(['连连看已结束', toButton([[{ text: '开始游戏', callback: '/连连看' }]])])
    }
    if (!GAME[e.group_id]) {
      GAME[e.group_id] = new LinkGame()
      const game = GAME[e.group_id]
      game.init()
    }
    const game = GAME[e.group_id]
    const buttons = []
    for (const pic of game.pictures) {
      const button = []
      for (const i of pic) {
        if (i.pic) {
          button.push({ text: i.pic, input: `连线 ${i.row},${i.col}`, QQBot: { action: { reply: true }, render_data: { style: 1 } } })
        }
      }
      if (button.length) {
        buttons.push(button)
      }
    }
    return e.reply([`连连看,可多选,必须两两成对\t\t\t[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/结束连连看')}&reply=false&enter=true)\r得分:${game.score}\t\t\t剩余时间:${game.leftTime}`, toButton(buttons)])
  }

  async link (e) {
    if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
      return false
    }
    e.toQQBotMD = true
    if (!GAME[e.group_id]) {
      return await e.reply(['连连看未开始', toButton([[{ text: '开始游戏', callback: '/连连看' }]])])
    }
    const game = GAME[e.group_id]
    if (game.gameStatus == -1) {
      delete GAME[e.group_id]
      return await e.reply(['连连看时间已用尽', toButton([[{ text: '开始游戏', callback: '/连连看' }]])])
    }
    const reg = /\s*连线\s*\d+,\d+\s*/g
    let log = ''
    const arr = []
    for (const i of e.msg.match(reg)) {
      const msg = i.replace(/连线\s*/, '').trim()
      const [x, y] = msg.split(',')
      if (log) log += ' '
      log += `${x},${y}`
      arr.push({ row: +x, col: +y })
      if (arr.length == 2) {
        const ret = game.checkMatch(arr[0], arr[1])
        if (ret == 1) {
          await e.reply([`恭喜你获得胜利\r得分:${game.score}\t\t\t剩余时间:${game.leftTime}`, toButton([[{ text: '开始游戏', callback: '/连连看' }]])])
          delete GAME[e.group_id]
          return true
        }
        arr.length = 0
      }
    }
    const buttons = []
    for (const pic of game.pictures) {
      const button = []
      for (const i of pic) {
        if (i.pic) {
          if (i.isEmpty) {
            button.push({ text: ' ', input: `连线 ${i.row},${i.col}`, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
          } else {
            button.push({ text: i.pic, input: `连线 ${i.row},${i.col}`, QQBot: { action: { reply: true }, render_data: { style: 1 } } })
          }
        }
      }
      if (button.length) {
        buttons.push(button)
      }
    }
    return e.reply([`连连看,可多选,必须两两成对\t\t\t[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/结束连连看')}&reply=false&enter=true)\r得分:${game.score}\t\t\t剩余时间:${game.leftTime}`, toButton(buttons)])
  }
}
