import { segment, Bot } from '#lib'
import { Config } from '#components'
import { TodaySuperPower } from '#models'

const todaySuperPower = new TodaySuperPower()
await todaySuperPower.init()

export const app = {
  id: 'todaySuperPower',
  name: '今日超能力'
}

export const rule = {
  superPower: {
    reg: /^#?(刷新)?[今昨明][日天]超能力$/,
    fnc: async e => {
      if (!checkEnable(e)) return false

      let msg
      if (e.msg.includes('今')) {
        if (e.msg.includes('刷新') && e.isMaster) {
          await todaySuperPower.getTodaySuperPower(true)
        }
        msg = todaySuperPower.getTodayMsg()
      } else if (e.msg.includes('昨')) {
        msg = todaySuperPower.getYesterdayMsg()
      } else if (e.msg.includes('明')) {
        if (e.msg.includes('刷新') && e.isMaster) {
          await todaySuperPower.getTomorrowSuperPower(true)
        }
        msg = await todaySuperPower.getTomorrowMsg(e.isMaster)
      }
      return await e.reply(msg)
    }
  },
  action: {
    reg: /^#?(不按|按下)$/,
    fnc: async e => {
      if (!checkEnable(e)) return false

      const data = e.msg.includes('按下')
        ? {
            action: 'press',
            oppositeAction: 'notPress',
            tip: '按下'
          }
        : {
            action: 'notPress',
            oppositeAction: 'press',
            tip: '不按'
          }
      const select = todaySuperPower.setAction(e.user_id, data)
      const msg = todaySuperPower.getTodayMsg(select)
      return await e.reply(msg)
    }
  },
  review: {
    reg: /^#?评论\s*(.*)$/,
    fnc: async e => {
      if (!checkEnable(e)) return false
      const message = e.msg.replace(/#?评论\s*/, '')
      if (!message) {
        return false
      }
      const id = todaySuperPower.addReview(message, e.user_id, await e.friend.getAvatarUrl())
      if (Config.todaySuperPower.examineReviewInfo.enable) {
        await e.reply('评论成功,等待审核中~')
        const bot = Bot[Config.todaySuperPower.otherBotInfo.QQ].pickGroup(Config.todaySuperPower.otherBotInfo.group)
        const msg = [segment.at(Number(Config.todaySuperPower.QQBotInfo.QQ)), ' #查看评论' + id]
        const { message_id } = await bot.sendMsg(msg)
        await bot.recallMsg(message_id)
      } else {
        await e.reply('评论成功~')
        todaySuperPower.setReview('pass', id - 1)
      }
      return true
    }
  },
  lookReview: {
    reg: /^#?(?:一键)?(点赞|点踩|查看|通过|删除)(?:待审核?)?评论\s*([0-9]*)$/,
    fnc: async e => {
      if (!checkEnable(e)) return false
      // const regRet = reg.lookReview.exec(e.msg)
      const regRet = rule.lookReview.reg.exec(e.msg)
      const id = regRet[2] ? regRet[2] - 1 : -1
      const isMaster = e.isMaster || e.user_id == Config.todaySuperPower.otherBotInfo.QQBotID
      if (regRet[1] == '查看') {
        const msg = await todaySuperPower.getReviewImg(e, id, isMaster)
        return await e.reply(msg)
      } else if (regRet[1] == '通过') {
        if (!isMaster) return true
        const key = e.msg.includes('一键') ? 'passAll' : 'pass'
        const msg = todaySuperPower.setReview(key, id)
        await e.reply(msg, true, { recallMsg: 30 })
      } else if (regRet[1] == '删除') {
        if (!isMaster) return true
        const msg = todaySuperPower.setReview('delete', id)
        await e.reply(msg, true, { recallMsg: 30 })
      } else {
        const tip = regRet[1]
        const type = {
          点赞: 'like',
          点踩: 'dislike'
        }[tip]
        const msg = todaySuperPower.setReview(type, id, e.user_id, tip)
        await e.reply(msg, true, { recallMsg: 30 })
      }
      return true
    }
  }
}

function checkEnable (e) {
  if (Config.todaySuperPower.enable === false) return false
  let enable = false
  for (const adapter of Config.todaySuperPower.adapter) {
    let key = e
    for (const i of adapter.key.split('.').slice(1)) {
      try {
        key = key[i]
      } catch (error) {
        continue
      }
    }
    if (key == adapter.value) {
      enable = true
      break
    }
  }
  if (!enable) {
    return false
  }
  return true
}

// export const todaySuperPower = new App(app, rule).create()
