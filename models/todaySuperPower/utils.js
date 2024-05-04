import db from './db.js'
import { getTime, readFile, writeFile, toButton } from '../common.js'
import schedule from 'node-schedule'
import { Version, Config } from '../../components/index.js'
import fs from 'node:fs'
import { join } from 'node:path'

const dataPath = 'resources/todaySuperPower/data.json'
if (!fs.existsSync(dataPath)) {
  const defaultPath = 'resources/todaySuperPower/data_default.json'
  fs.copyFileSync(join(Version.pluginPath, defaultPath), join(Version.pluginPath, dataPath))
}

export default class TodaySuperPower {
  constructor () {
    this.time = getTime()
  }

  async init () {
    this.setScheduleJob()
    await this.getTodaySuperPower()
  }

  save (time = this.time, data = this.todaySuperPower) {
    db.set(time, data)
  }

  /**
   * 每天0点执行一次
   * 刷新时间和超能力
   */
  setScheduleJob () {
    schedule.scheduleJob('0 0 0 * * ?', () => {
      this.time = getTime()
      this.getTodaySuperPower()
    })
    if (Config.todaySuperPower.TomorrowSuperPowerInfo.enable) {
      schedule.scheduleJob(Config.todaySuperPower.TomorrowSuperPowerInfo.cron, async () => {
        const bot = Bot[Config.todaySuperPower.otherBotInfo.QQ].pickGroup(Config.todaySuperPower.otherBotInfo.group)
        const msg = [segment.at(Number(Config.todaySuperPower.QQBotInfo.QQ)), ' #明日超能力']
        const { message_id } = await bot.sendMsg(msg)
        await bot.recallMsg(message_id)
      })
    }
  }

  /**
   * 随机拿一个
   */
  randomSuperPower () {
    const file = readFile(dataPath)
    const index = Math.floor(Math.random() * file.unused.length)
    const item = file.unused.splice(index, 1).pop()
    file.used.push(item)
    writeFile(dataPath, file)
    const data = {
      will: item.will,
      but: item.but,
      review: [],
      press: 0,
      notPress: 0,
      user: {}
    }
    return data
  }

  /**
   * 生成今日超能力
   * @param {boolean} 是否强制生成金日超能力
   */
  async getTodaySuperPower (force = false) {
    const today = getTime()
    let data = await db.get(today)
    if (!data || force) {
      data = this.randomSuperPower()
      await db.set(today, data)
    }
    this.todaySuperPower = data
  }

  /**
   * 生成明日超能力
   * @param {boolean} 是否强制生成明日超能力
   */
  async getTomorrowSuperPower (force = false) {
    const tomorrow = getTime(1)
    let data = await db.get(tomorrow)
    if (!data || force) {
      data = this.randomSuperPower()
      await db.set(tomorrow, data)
    }
    return data
  }

  /**
   * 获得昨日超能力
   */
  async getYesterdaySuperPower () {
    const yesterday = getTime(-1)
    return await db.get(yesterday)
  }

  /**
   * 设置用户的选择: 按下或不按
   * @param {string} userId
   * @param {{action: string,oppositeAction:string, tip: string}} select
   */
  setAction (userId, { action, oppositeAction, tip }) {
    let msg
    if (this.todaySuperPower.user[userId]) {
      const currentUserAction = this.todaySuperPower.user[userId]

      if (currentUserAction !== action) {
        this.todaySuperPower[action]++
        this.todaySuperPower[oppositeAction]--
        this.todaySuperPower.user[userId] = action
      }
      msg = `${currentUserAction === 'press' ? '按下' : '不按'},本次更换为${tip}`
    } else {
      this.todaySuperPower[action]++
      this.todaySuperPower.user[userId] = action
      msg = tip
    }
    this.save()
    return msg
  }

  /**
   * 评论
   * @param {string} message 评论内容
   * @param {string} userId 评论用户id
   * @param {string} avatarUrl 评论用户头像url
   */
  addReview (message, userId, avatarUrl) {
    const id = this.todaySuperPower.review.length + 1
    this.todaySuperPower.review.push({
      userId,
      avatar: avatarUrl,
      nickname: id,
      message,
      show: false,
      like: {},
      dislike: {},
      report: {}
    })
    this.save()
    return id
  }

  /**
   * 对评论进行操作
   * @param {'like'|'dislike'|'pass'|'delete'} type 操作类型
   * @param {number} id 评论id,需要-1
   * @param {string|undefined} userId 执行操作的用户id
   */
  setReview (type, id, userId, tip) {
    if (!this.todaySuperPower.review[id]) return '没有这个id~'
    let msg
    switch (type) {
      case 'like':
      case 'dislike':
        if (id == -1) {
          msg = `要${tip}哪一条呢?`
        } else if (!this.todaySuperPower.review[id]) {
          msg = '没有这条评论~'
        } else if (this.todaySuperPower.review[id][type][userId]) {
          msg = `已经对这条评论${tip}过了~`
        } else {
          this.todaySuperPower.review[id][type][userId] = true
          msg = `${tip}成功~`
        }
        break
      case 'pass':
        this.todaySuperPower.review[id].show = true
        msg = '已通过~'
        break
      case 'delete':
        this.todaySuperPower.review[id].show = false
        msg = '已删除~'
        break
      default:
        break
    }
    this.save()
    return msg
  }

  /**
   * 获取评论图片
   * @param {*} e
   * @returns msg
   */
  async getReviewImg (e, id = -1, isMaster = false) {
    if (!this.todaySuperPower.review.some(i => i.show)) return '还没有评论哦~'
    const msg = []
    const renderData = {}
    if (id != -1 && isMaster) {
      if (!this.todaySuperPower.review[id]) return '没有这条评论~'
      renderData.review = [this.todaySuperPower.review[id]].map(i => {
        return {
          id: i.nickname,
          avatar: i.avatar,
          likeTotal: Object.keys(i.like).length,
          dislikeTotal: Object.keys(i.dislike).length,
          message: this.encodeHtml(i.message),
          select: {
            press: '按下',
            notPress: '不按'
          }[this.todaySuperPower.user[i.userId]] || '未选择',
          show: true
        }
      })
      msg.push(toButton([
        [
          { text: '通过', callback: '#通过评论' + (id + 1) },
          { text: '删除', callback: '#删除评论' + (id + 1) }
        ]
      ]))
    } else {
      renderData.review = this.todaySuperPower.review.map(i => {
        return {
          id: i.nickname,
          avatar: i.avatar,
          likeTotal: Object.keys(i.like).length,
          dislikeTotal: Object.keys(i.dislike).length,
          message: this.encodeHtml(i.message),
          select: {
            press: '按下',
            notPress: '不按'
          }[this.todaySuperPower.user[i.userId]] || '未选择',
          show: i.show
        }
      })
      msg.push(toButton([
        [
          { text: '点赞评论', input: '/点赞评论' },
          { text: '点踩评论', input: '/点踩评论' }
        ]
      ]))
    }
    const img = await e.runtime.render(Version.pluginName, 'todaySuperPower/html/index', renderData, {
      retType: 'base64',
      beforeRender: ({ data }) => {
        data.pageGotoParams.waitUntil = 'load'
        return data
      }
    })
    msg.unshift(img)
    return msg
  }

  getMsg (superPower, select) {
    const tip = select ? `***\r>你已经选择${select}\r\r` : ''
    return [
        `\r#你会按下这个按钮吗?\r${superPower.will}\r\r#但是:\r ${superPower.but}\r\r${tip}>已有${superPower.press}人选择按下,${superPower.notPress}人选择不按`
    ]
  }

  getTodayMsg (select = '') {
    const msg = this.getMsg(this.todaySuperPower, select)
    msg.push(toButton([
      [
        { text: '按下', callback: '/按下' },
        { text: '不按', callback: '/不按' }
      ],
      [
        { text: '点击评论', input: '/评论' },
        {
          text: '查看评论', callback: '/查看评论'
        }
      ]
    ]))
    return msg
  }

  getYesterdayMsg () {
    const data = this.getYesterdaySuperPower()
    const msg = []
    if (data) {
      msg.push(...this.getMsg(data, ''))
      msg.push(toButton([
        [
          {
            text: '查看评论', callback: '/查看昨日评论'
          }
        ]
      ]))
    } else {
      msg.push('昨日没有超能力哦~')
    }
    return msg
  }

  getTomorrowMsg (isMaster = false) {
    const data = this.getTomorrowSuperPower()
    const msg = this.getMsg(data, '')
    if (isMaster) {
      msg.push(toButton([
        [
          { text: '刷新明日超能力', callback: '/刷新明日超能力' }
        ]
      ]))
    }
    return msg
  }

  encodeHtml (str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '©': '&copy;',
      '®': '&reg;'
    }

    return str.replace(new RegExp(`[${Object.keys(map).join('')}]`, 'g'), (m) => map[m])
  }
}
