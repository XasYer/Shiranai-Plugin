import Life from '../models/remake/life.js'
import config from '../models/remake/config.js'
import { findUser, createUser } from '../models/db/remake.js'
import { setItem, saveItem } from '../models/remake/save.js'
import { pluginName } from '../components/index.js'
import { toButton, setTimer } from '../models/common.js'

const cache = {}

const talentButton = [[
  { text: '0', input: '0' },
  { text: '1', input: '1' },
  { text: '2', input: '2' },
  { text: '3', input: '3' }
], [
  { text: '4', input: '4' },
  { text: '5', input: '5' },
  { text: '6', input: '6' },
  { text: '7', input: '7' }
], [
  { text: '8', input: '8' },
  { text: '9', input: '9' },
  { text: '随机', callback: '随机' }
]]

const pointButton = [[
  { text: '0', input: '0' },
  { text: '1', input: '1' },
  { text: '2', input: '2' },
  { text: '3', input: '3' }
], [
  { text: '4', input: '4' },
  { text: '5', input: '5' },
  { text: '6', input: '6' },
  { text: '7', input: '7' }
], [
  { text: '8', input: '8' },
  { text: '9', input: '9' },
  { text: '10', input: '10' },
  { text: '随机', callback: '随机' }
]]

export class remake extends plugin {
  constructor () {
    super({
      name: '[Shiranai-Plugin] 人生重开模拟器',
      dsc: '[Shiranai-Plugin] 人生重开模拟器 ',
      event: 'message',
      priority: 1,
      rule: [
        {
          reg: /^[#/]?(人生重[开启来]|remake|liferestart)$/,
          fnc: 'remake'
        },
        {
          reg: '',
          fnc: 'select',
          log: false
        }
      ]
    })
  }

  async remake (e) {
    const user_id = getUserId(e)
    if (cache[user_id]) {
      delete cache[user_id]
      return await e.reply([segment.at(e.user_id),
        '\n人生重开已取消'])
    }
    const data = await getUserInfo({ user_id })
    data.times++
    for (const i in data) {
      if (data[i] === '') continue
      setItem(user_id, i, data[i])
    }
    const core = new Life(user_id)
    core.config(config)
    await core.initial()
    const randTLT = core.talentRandom()
    cache[user_id] = {
      core,
      randTLT,
      type: 'TLT',
      timer: setTimer(e, 120, [
        segment.at(e.user_id),
        '人生重开已取消'
      ], () => delete cache[user_id])
    }
    e.toQQBotMD = true
    return await e.reply([
      segment.at(e.user_id),
      '\n',
      [
        '请发送编号选择3个天赋,如"0 1 2",用空格分割,或发送"随机"随机选择\n',
        randTLT.map((val, i) => (`${i}.【${val.name}】: ${val.description}`)).join('\n')
      ].join('\n'),
      toButton(talentButton)
    ])
  }

  async select (e) {
    if (!e.msg) return false
    const user_id = getUserId(e)
    if (!cache[user_id]) return false
    const msg = e.msg.trim().replace(/^[#/]/, '')
    clearTimeout(cache[user_id].timer)
    e.toQQBotMD = true
    if (cache[user_id].type === 'TLT') {
      const randTLT = cache[user_id].randTLT
      const selectTLTRet = []
      if (msg == '随机') {
        while (true) {
          const rand = Math.floor(Math.random() * randTLT.length)
          const i = randTLT.splice(rand, 1)
          selectTLTRet.push(...i)
          if (selectTLTRet.length == 3) {
            break
          }
        }
      } else if (/^(\d\s+){2}\d$/.test(msg)) {
        for (let i of msg.split(/\s+/)) {
          i = Number(i)
          if (i < 0 || i > 9) {
            cache[user_id].timer = setTimer(e, 120, [
              segment.at(e.user_id),
              '人生重开已取消'
            ], () => delete cache[user_id])
            return await e.reply([
              segment.at(e.user_id),
              '\n请发送正确的编号',
              toButton(talentButton)])
          }
          const talent = randTLT[i]
          if (selectTLTRet.some(s => s.id == talent.id)) {
            cache[user_id].timer = setTimer(e, 120, [
              segment.at(e.user_id),
              '人生重开已取消'
            ], () => delete cache[user_id])
            return await e.reply([
              segment.at(e.user_id),
              '\n不能选择相同的天赋,请重新选择',
              toButton(talentButton)])
          }
          selectTLTRet.push(talent)
        }
      } else {
        delete cache[user_id]
        return await e.reply([
          segment.at(e.user_id),
          '\n人生重开已取消'
        ])
      }
      const core = cache[user_id].core
      core.remake(selectTLTRet.map(({ id }) => id))
      const pts = core.getPropertyPoints()

      cache[user_id] = {
        core,
        pts,
        selectTLTRet,
        type: 'PTS',
        timer: setTimer(e, 120, [
          segment.at(e.user_id),
          '人生重开已取消'
        ], () => delete cache[user_id])
      }
      const limit = core.propertyAllocateLimit
      return await e.reply([
        segment.at(e.user_id),
        '\n',
        [
          '请发送4个数字分配"颜值、智力、体质、家境"4个属性，如"5 5 5 5"，或发送"随机"随机选择；\n',
                    `可用属性点为${pts}，每个属性不能超过${limit[1]}，不能低于${limit[0]}`
        ].join('\n'),
        toButton(pointButton)
      ])
    } else if (cache[user_id].type === 'PTS') {
      let selectStatsRet
      const core = cache[user_id].core
      const limit = core.propertyAllocateLimit
      let pts = cache[user_id].pts
      if (msg == '随机') {
        const arr = new Array(4).fill(limit[1])
        while (pts > 0) {
          const sub = Math.round(Math.random() * (Math.min(pts, limit[1]) - 1)) + 1
          while (true) {
            const select = Math.floor(Math.random() * 4) % 4
            if (arr[select] - sub < 0) continue
            arr[select] -= sub
            pts -= sub
            break
          }
        }
        selectStatsRet = {
          CHR: limit[1] - arr[0], // 颜值 charm CHR
          INT: limit[1] - arr[1], // 智力 intelligence INT
          STR: limit[1] - arr[2], // 体质 strength STR
          MNY: limit[1] - arr[3] // 家境 money MNY
        }
      } else if (/(\d+\s+){3}\d+/.test(msg)) {
        const arr = []
        let sum = 0
        for (let i of msg.split(/\s+/)) {
          i = Number(i)
          if (i < limit[0] || i > limit[1]) {
            cache[user_id].timer = setTimer(e, 120, [
              segment.at(e.user_id),
              '人生重开已取消'
            ], () => delete cache[user_id])
            return await e.reply([
              segment.at(e.user_id),
                            `\n每个属性不能超过${limit[1]}和小于${limit[0]}，请重新发送`,
                            toButton(pointButton)
            ])
          }
          sum += i
          arr.push(i)
        }
        if (sum != pts) {
          cache[user_id].timer = setTimer(e, 120, [
            segment.at(e.user_id),
            '人生重开已取消'
          ], () => delete cache[user_id])
          return await e.reply([
            segment.at(e.user_id),
                        `\n属性之和需为${pts}，请重新发送`,
                        toButton(pointButton)
          ])
        }
        selectStatsRet = {
          CHR: arr[0], // 颜值 charm CHR
          INT: arr[1], // 智力 intelligence INT
          STR: arr[2], // 体质 strength STR
          MNY: arr[3] // 家境 money MNY
        }
      } else {
        delete cache[user_id]
        return await e.reply([
          segment.at(e.user_id),
          '\n人生重开已取消'
        ])
      }
      await e.reply([
        segment.at(e.user_id),
        '\n你的人生正在重开...请稍后',
        toButton([[{ text: '我也要玩', callback: '/remake' }]])
      ])
      const selectTLTRet = cache[user_id].selectTLTRet
      delete cache[user_id]
      core.start(selectStatsRet)
      let trajectory
      const event = []
      do {
        try {
          trajectory = core.next()
        } catch (e) {
          console.error(e)
          throw e
        }
        const { age, content, achievements } = trajectory
        let str = content.map(
          ({ type, description, rate, name, postEvent }) => {
            switch (type) {
              case 'TLT':
                return `天赋【${name}】发动：${description}`
              case 'EVT':
                return description + (postEvent ? `<br/>${postEvent}` : '')
              default:
                return ''
            }
          }
        ).join('<br/>')
        if (achievements.length) {
          str += '<br/>' + achievements.map(({ name, description }) => {
            return `获得成就【${name}】:<br/>${description}`
          }).join('<br/>')
        }
        event.push({
          ...core.propertys,
          age,
          content: str
        })
      } while (!trajectory.isEnd)
      const summary = core.summary
      const data = {
        selectTLTRet,
        selectStatsRet,
        event,
        summary
      }
      const img = await e.runtime.render(pluginName, 'remake/html/index', data, { retType: 'base64' })
      await e.reply([segment.at(e.user_id), '\n', img])
      await saveItem(user_id)
      return true
    }
    return false
  }
}

function getUserId (e) {
  return e.raw?.sender?.user_id || e.raw?.operator_id || e.user_id
}

async function getUserInfo (e) {
  const user_id = getUserId(e)
  let user_info = await findUser(user_id)
  if (!user_info) {
    user_info = await createUser(user_id)
  }
  return user_info
}
