import Popstar from '../models/popstar/Popstar.js'
import { toButton, extLetterToNumber, coordinateToIndex } from '../models/button/index.js'
import { sleep } from '../models/common.js'

const GAME = {}

export const app = {
  id: 'popstar',
  name: '轻量版消灭星星'
}

export const rule = {
  start: {
    reg: /^[#/](结束)?消灭星星$/,
    fnc: async e => {
      e.toQQBotMD = true
      if (e.msg.includes('结束')) {
        delete GAME[e.group_id]
        return e.reply(['消灭星星已结束', toButton([[{ text: '开始游戏', callback: '/消灭星星' }]], e.adapter_name, { defRetType: 'text' })])
      }
      if (!GAME[e.group_id]) {
        GAME[e.group_id] = new Popstar()
        const game = GAME[e.group_id]
        game.enter()
      }
      const game = GAME[e.group_id]
      game.page = 6
      const buttons = makeButton(game.model.grid, game.page, false, e.adapter_name)
      let msg = [
              `消灭星星\t\t关卡: ${game.level + 1}\t\t`,
              // `[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/结束消灭星星')}&reply=false&enter=true)\r`,
              `得分: ${game.total}\t\t\t目标: ${game.constrol.goal}`
      ]
      if (e.adapter_name == 'QQBot') {
        msg.push('\r\r>此功能比较刷屏,建议拉一个小群玩')
        msg.push(toButton(buttons.splice(0, 5), e.adapter_name))
        await e.reply(msg)
        await e.reply(['\u200B', toButton(buttons, e.adapter_name)])
      } else {
        msg.push('\r使用 “消灭”+位置 消灭方块，\n只能有一个个位置，如：“消灭 A1”')
        msg.push(await toButton(buttons, e.adapter_name))
        await e.reply(msg)
      }
      return true
    }
  },
  popstar: {
    reg: /^消灭\s*[A-Za-z0-9]+$/,
    fnc: async e => {
      e.toQQBotMD = true
      if (!GAME[e.group_id]) {
        return await e.reply(['消灭星星未开始', toButton([[{ text: '开始游戏', callback: '/消灭星星' }]], e.adapter_name, { defRetType: 'text' })])
      }
      const game = GAME[e.group_id]
      const userMsg = e.msg.replace(/^消灭\s*/, '')
      const index = Number(userMsg) || coordinateToIndex(...extLetterToNumber(userMsg))
      const count = game.model.clean(index)
      game.total += count * count * 5
      const l = count > 0 ? `${count}连消 ${count * count * 5}分` : ''
      const msg = [
              `消灭星星\t\t关卡: ${game.level + 1}\t\t`
              // `[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/结束消灭星星')}&reply=false&enter=true)\r`
      ]
      if (game.model.check() === false) {
        const { score, count } = game.model.cleanAll()
        msg.push(`\r本局已结束,剩余${count}个方块`)
        if (score > 0) {
          msg.push(`,获得得分: ${score}`)
          game.total += score
        }
        msg.push(`得分: ${game.total}\t\t\t目标: ${game.constrol.goal}\r${l || ''}`)
        if (game.total >= game.constrol.goal) {
          msg.push(`\r关卡${game.level + 1}已通过,即将进入下一关`)
          await e.reply(msg)
          await sleep(2000)
          msg.length = 0
          msg.push(`消灭星星\t\t关卡: ${game.level + 2}`)
          // \t\t[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/结束消灭星星')}&reply=false&enter=true)\r
          game.next()
        } else {
          msg.push('得分低于关卡目标得分,游戏结束!')
          msg.push(toButton([[{ text: '再来一局', callback: '/消灭星星' }]], e.adapter_name, { defRetType: 'text' }))
          delete game[e.group_id]
          return await e.reply(msg)
        }
      } else {
        msg.push(`得分: ${game.total}\t\t\t目标: ${game.constrol.goal}\r${l || ''}`)
      }
      const buttons = makeButton(game.model.grid, game.page, false, e.adapterName)
      if (e.adapter_name == 'QQBot') {
        msg.push('\r\r>此功能比较刷屏,建议拉一个小群玩')
        msg.push(toButton(buttons.splice(0, 5), e.adapter_name))
        await e.reply(msg)
        if (buttons.length) {
          await e.reply(['\u200B', toButton(buttons, e.adapter_name)])
        }
      } else {
        msg.push(await toButton(buttons, e.adapter_name))
        await e.reply(msg)
      }
      return true
    }
  }
  // changeView: {
  //   reg: /^[#/]消灭星星第\d排$/,
  //   fnc: async e => {
  //     if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
  //       return false
  //     }
  //     e.toQQBotMD = true
  //     if (!GAME[e.group_id]) {
  //       return
  //     }
  //     const page = +e.msg.replace(/^[#\/]消灭星星第(\d)排$/, '$1')
  //     if (page < 1 || page > 6) {
  //       return
  //     }
  //     const game = GAME[e.group_id]
  //     game.page = page
  //     const buttons = makeButton(game.model.grid, page)
  //     const msg = [
  //       '消灭星星\t\t\t\t',
  //         `[结束游戏] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/消灭星星')}&reply=false&enter=true)\r`,
  //         `得分: ${game.total}\r`]
  //     for (let i = 1; i < 7; i++) {
  //       msg.push(`[[显示${i}-${i + 4}排${game.page == i ? '✔' : ''}]] (mqqapi://aio/inlinecmd?command=${encodeURIComponent(`/消灭星星第${i}排`)}&reply=false&enter=true)\t\t`)
  //       if (i % 3 == 0) {
  //         msg.push('\r')
  //       }
  //     }
  //     msg.push(toButton(buttons))
  //     return e.reply(msg)
  //   }
  // }
}

function makeButton (arr, page = 6, end = false, adapterName) {
  const buttons = []
  const button = []
  let index = 0
  for (let i = 0; i < arr.length; i++) {
    index++
    const b = {
      text: clrMap[arr[i]?.clr] + '',
      callback: '消灭 ' + arr[i]?.index,
      style: 1,
      QQBot: {
        render_data: {
          style: 1
        }
      }
    }
    if (!arr[i]) {
      b.text = ' '
      b.style = 0
      b.QQBot = {
        render_data: {
          style: 0
        }
      }
      b.permission = 'xxx'
    }
    if (end) {
      b.permission = 'xxx'
    }
    button.push(b)
    if (index % 10 == 0) {
      if (!button.every(a => a.permission) && adapterName !== 'QQBot') {
        buttons.push([...button])
      }
      button.length = 0
    }
  }
  return buttons
}

const clrMap = {
  0: '🧡',
  1: '🖤',
  2: '💛',
  3: '💚',
  4: '💙'
}
