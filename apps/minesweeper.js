import MineSweeper from '../models/boardgame/minesweeper.js'
import { toButton, extLetterToNumber } from '../models/button/index.js'
// import { App } from '#components'

// 多少行
const row = 5
// 每行多少个
const column = 10
// 雷数量
const mineNum = 10

const MineGame = {}

export const app = {
  id: 'minesweeper',
  name: '轻量版扫雷'
}

export const rule = {
  mine: {
    reg: /^[#/]扫雷(轻量版?|按钮版?)?\d*$/,
    fnc: async e => {
      const game = MineGame[e.group_id]
      if (game) {
        e.msg = '挖开 0,0'
        return false
      }
      let num = e.msg.replace(/[#/]扫雷(轻量版?|按钮版?)?/, '')
      num = Number(num) || mineNum
      if (num < 0 || num > 50) {
        num = mineNum
      }
      MineGame[e.group_id] = new MineSweeper(row, column, num)
      MineGame[e.group_id].setMines()
      const buttons = []
      let x = 1
      for (const i of MineGame[e.group_id].tiles) {
        const button = []
        let y = 1
        for (let k = 0; k < i.length; k++) {
          button.push({ text: ' ', input: `挖开 ${x},${y}`, style: 1, QQBot: { render_data: { style: 1 } } })
          y++
        }
        x++
        buttons.push(button)
      }
      const msg = e.adapter_name === 'QQBot' ? '请点击按钮,可多选' : '使用 “挖开”+位置 挖开方块，使用 “标记”+位置 标记方块，\n可同时加多个位置，如：“挖开 A1 B2”'
      return await e.reply([msg, await toButton(buttons, e.adapter_name)])
    }
  },
  open: {
    reg: /^((挖开|标记)\s*(\d+,\d+|[A-Za-z0-9]|\s)*)+$/,
    fnc: async e => {
      const game = MineGame[e.group_id]
      if (!game) {
        return e.reply(['游戏未开始', await toButton([[{ text: '开始游戏', callback: '#扫雷' }]], e.adapter_name, { defRetType: 'text' })])
      }
      const target = e.msg.includes('标记') ? 'mark' : 'open'
      let log = ''
      let state = 0; let mine
      for (const i of e.msg.replace(/(挖开|标记)/g, '').split(' ')) {
        if (!i) continue
        const [x, y] = i.includes(',') ? i.split(',') : extLetterToNumber(i)
        if (x && y) {
          const ret = game[target](+x - 1, +y - 1)
          if (log) log += ' '
          log += `${x},${y}`
          if (ret == 2 || ret == 3) {
            state = ret
            mine = x + ',' + y
            break
          }
        }
      }
      const buttons = []
      let x = 1
      const content = (() => {
        let msg = ''
        if (state == 3) {
          msg = `你输了 ${mine}是雷`
          return e.adapter_name === 'QQBot' ? msg + `  [再来一局] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('#扫雷')}&reply=false&enter=true)` : msg
        } else if (state == 2) {
          msg = '你赢了!!'
          return e.adapter_name === 'QQBot' ? msg + `  [再来一局] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('#扫雷')}&reply=false&enter=true)` : msg
        } else {
          return e.adapter_name === 'QQBot' ? `[点击切换标记模式或者在文字最后加上标记] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('标记')}&reply=false&enter=false)` : ''
        }
      })()
      for (const i of game.tiles) {
        const button = []
        let y = 1
        for (const k of i) {
          if (state == 3 || state == 2) {
            if (k.isMine) {
              button.push({ text: '雷', input: `挖开 ${x},${y}`, style: 0, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
            } else if (k.isOpen) {
              button.push({ text: (k.count || ' ') + '', input: `挖开 ${x},${y}`, style: 0, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
            } else {
              button.push({ text: ' ', input: `挖开 ${x},${y}`, permission: 'xxx', style: 1, QQBot: { render_data: { style: 1 } } })
            }
          } else {
            if (k.isOpen) {
              button.push({ text: (k.count || ' ') + '', input: `挖开 ${x},${y}`, style: 0, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
            } else if (k.marked) {
              button.push({ text: '★', input: `挖开 ${x},${y}`, style: 1, QQBot: { render_data: { style: 1 } } })
            } else {
              button.push({ text: ' ', input: `挖开 ${x},${y}`, style: 1, QQBot: { render_data: { style: 1 } } })
            }
          }
          y++
        }
        x++
        buttons.push(button)
      }
      if (state == 3 || state == 2) {
        MineGame[e.group_id] = null
      }
      return await e.reply([content, await toButton(buttons, e.adapter_name)])
    }
  }
}

// export const minesweeper = new App(app, rule).create()
