import { MainScene } from '../models/catchTheCat/index.js'
import { Config, Render, App } from '#components'
import { extLetterToNumber, toButton } from '../models/button/index.js'
import { segment } from '#lib'

const GAME = {}

export const app = {
  id: 'catchTheCat',
  name: '圈小猫'
}

export const rule = {
  start: {
    reg: /^#?(重置)?[圈抓]小猫$/,
    fnc: async e => {
      const reset = !!e.msg.includes('重置')
      const key = getKey(e)
      if (!GAME[key] || reset) {
        GAME[key] = new MainScene(Config.catchTheCat.rows, Config.catchTheCat.cols, Config.catchTheCat.initialWallCount)
      }
      const game = GAME[key]
      if (!game.state) game.create()
      const msg = await render(game, '点击小圆点，围住小猫', e.user_id)
      return await e.reply(msg)
    }
  },
  game: {
    reg: /^#?点击\s*[A-Za-z0-9]+/,
    fnc: async e => {
      const key = getKey(e)
      if (!GAME[key]) {
        if (Config.catchTheCat.noStartTip) {
          return await e.reply(Config.catchTheCat.noStartTip)
        } else {
          return rule.start.fnc(e)
        }
      }
      const game = GAME[key]
      const [x, y] = extLetterToNumber(e.msg.replace(/^#?点击\s*/, '')).map(x => x - 1).reverse()
      const { message, state } = game.playerClick(x, y)
      const msg = await render(game, message, e.user_id)
      if (state) delete GAME[key]
      return await e.reply(msg)
    }
  },
  rollback: {
    reg: /^#?回退[抓圈]小猫$/,
    fnc: async e => {
      const key = getKey(e)
      if (!GAME[key]) return
      const game = GAME[key]
      const { message } = game.undo()
      const msg = await render(game, message, e.user_id)
      return await e.reply(msg)
    }
  }
}

export const catchTheCat = new App(app, rule).create()

async function render (game, message, user_id) {
  const img = await Render.simpleRender('catchTheCat/index', {
    message,
    blocks: JSON.stringify(game.blocks),
    cat: JSON.stringify({ i: game.cat.i, j: game.cat.j })
  })
  const msg = [img]
  if (Config.catchTheCat.at) msg.push(segment.at(user_id))
  msg.push(toButton([[
    { text: '点击', input: '点击' }
  ], [
    { text: '回退', input: '回退抓小猫' },
    { text: '重置', input: '重置抓小猫' }
  ]], 'QQBot'))
  return msg
}

function getKey (e) {
  switch (Config.catchTheCat.scope) {
    case 'group':
      return e.group_id
    case 'user':
      return e.user_id
    case 'group.user':
      return `${e.group_id}.${e.user_id}`
    default:
      return e.group_id
  }
}
