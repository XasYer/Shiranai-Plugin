import { toButton, setTimer } from '../models/common.js'
import TicTacToe from '../models/boardgame/TicTacToe.js'

const GAME = {}

export const app = {
  id: 'TicTacToe',
  name: '轻量版井字棋'
}

export const rule = {
  start: {
    reg: /^[#/]?[井#]字棋$/,
    fnc: async e => {
      if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
        return false
      }
      e.toQQBotMD = true
      if (GAME[e.group_id]) {
        const game = GAME[e.group_id]
        if (game.start) {
          return e.reply(['井字棋已开始,请等待结束'])
        } else if (game.playerX == (e.sender.user_openid || e.user_id)) {
          return e.reply(['不能和自己下棋'])
        } else {
          clearTimeout(game.timer)
          game.timer = setTimer(e, 180, ['井字棋已超时自动结束', toButton([[{ text: '井字棋', callback: '/井字棋' }]])], () => delete GAME[e.group_id])
          game.playerO = e.sender.user_openid || e.user_id
          return e.reply([
            segment.at(e.user_id),
            '加入了游戏\r请',
            segment.at(game.playerX),
            '选择',
            game.toButton()
          ])
        }
      }
      GAME[e.group_id] = new TicTacToe(e.sender.user_openid || e.user_id)
      const game = GAME[e.group_id]
      game.timer = setTimer(e, 180, ['井字棋已超时自动结束', toButton([[{ text: '井字棋', callback: '/井字棋' }]])], () => delete GAME[e.group_id])
      game.playerX = e.sender.user_openid || e.user_id
      return e.reply([
        segment.at(e.user_id),
        '发起了井字棋\r',
        '可发送 井字棋 加入对局',
        toButton([[{ text: '接收挑战', callback: '/井字棋' }]])
      ])
    }
  },
  ticTacToe: {
    reg: /^[#/]?[井#]字棋下\s*\d$/,
    fnc: async e => {
      if (e.bot.adapter.name != 'QQBot' && !e.bot.config?.markdown) {
        return false
      }
      e.toQQBotMD = true
      if (!GAME[e.group_id]) {
        return e.reply(['井字棋未开始', toButton([[{ text: '井字棋', callback: '/井字棋' }]])])
      }
      const game = GAME[e.group_id]
      clearTimeout(game.timer)
      if (game.nextPlayer.user_id != (e.sender.user_openid || e.user_id)) {
        return e.reply([segment.at(e.user_id), '现在不是你的回合'])
      }
      const result = game.move(e.msg.replace(/[#/]?[井#]字棋下\s*/, ''))
      if (!result.validMove) {
        game.timer = setTimer(e, 180, ['井字棋已超时自动结束', toButton([[{ text: '井字棋', callback: '/井字棋' }]])], () => delete GAME[e.group_id])
        return e.reply([segment.at(e.user_id), '坐标有误,请重新发送', game.toButton()])
      }
      if (result.isWin) {
        delete GAME[e.group_id]
        return e.reply(['恭喜', segment.at(e.user_id), '获得胜利!', game.toButton([{ text: '井字棋', callback: '/井字棋' }])])
      }
      if (result.isDraw) {
        delete GAME[e.group_id]
        return e.reply(['本次平局!', game.toButton([{ text: '井字棋', callback: '/井字棋' }])])
      }
      game.timer = setTimer(e, 180, ['井字棋已超时自动结束', toButton([[{ text: '井字棋', callback: '/井字棋' }]])], () => delete GAME[e.group_id])
      return e.reply([
        '请',
        segment.at(game.nextPlayer.user_id),
        '选择',
        game.toButton()
      ])
    }
  }
}
