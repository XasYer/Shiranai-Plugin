import { Config, Render, App } from '#components'
import { getShindanTitle, makeShindan, getGroupMemberInfo } from '#models'

export const app = {
  id: 'shindan',
  name: 'shindan占卜'
}

function getShindanReg () {
  return new RegExp(`^(${Config.shindan.shindanList.map(i => i.command).join('|')})\\s*(.*)$`)
}

export const rule = {
  shindan: {
    reg: getShindanReg(),
    fnc: async e => {
      let [, command, name] = rule.shindan.reg.exec(e.msg) || []
      if (!command) {
        return
      }
      if (!name) {
        const at = Array.isArray(e.at) ? e.at[e.at.length - 1] : e.at
        if (at) {
          const info = await getGroupMemberInfo(e, e.group_id, at)
          name = info.card || info.nickname || info.nick || at
        } else {
          name = e.sender.card || e.sender.nickname || e.sender.nick || e.user_id
        }
      }
      for (const i of Config.shindan.shindanList) {
        if (i.command == command) {
          const shindanResult = await makeShindan(i.id, name)
          const img = await Render.simpleRender('shindan/index', {
            ...shindanResult,
            pageGotoParams: {
              waitUntil: 'networkidle0'
            }
          })
          return await e.reply(img)
        }
      }
    }
  },
  modifyShindan: {
    reg: /^#(添加|删除)占卜/,
    fnc: async e => {
      if (e.msg.includes('添加')) {
        let [id, command] = e.msg.replace('#添加占卜', '').trim().split(' ')
        id = Number(id)
        if (isNaN(id)) {
          return await e.reply('请指定占卜ID')
        }
        if (!command) {
          return await e.reply('请指定触发指令')
        }
        const shindanList = Config.shindan.shindanList
        if (shindanList.some(i => i.id == id)) {
          return await e.reply('该占卜已存在')
        }
        if (shindanList.some(i => i.command == command)) {
          return await e.reply('该指令已存在')
        }
        const title = await getShindanTitle(id)
        if (!title) {
          return await e.reply('获取占卜标题失败,请手动添加')
        }
        shindanList.push({ id, command, title })
        Config.modify('shindan', 'shindanList', shindanList)
        await e.reply(`添加成功\nid: ${id}\n触发指令: ${command}\n标题: ${title}\n`)
      } else {
        const id = +e.msg.replace('#删除占卜', '').trim()
        if (isNaN(id)) {
          return await e.reply('请指定占卜ID')
        }
        const shindanList = Config.shindan.shindanList
        const index = shindanList.findIndex(i => i.id == id)
        if (index == -1) {
          return await e.reply('该占卜不存在')
        }
        const { command, title } = shindanList[index]
        shindanList.splice(index, 1)
        Config.modify('shindan', 'shindanList', shindanList)
        await e.reply(`删除成功\nid: ${id}\n触发指令: ${command}\n标题: ${title}\n`)
      }
      rule.shindan.reg = getShindanReg()
      const cls = new App(app)
      for (const key in rule) {
        const r = rule[key]
        cls.rule(key, r.reg, r.fnc, r.cfg)
      }
      await cls.change()
    }
  },
  shindanList: {
    reg: /^#?占卜列表$/,
    fnc: async e => {
      const img = await Render.simpleRender('shindan/list', { shindanList: Config.shindan.shindanList })
      return await e.reply(img)
    }
  }
}

export const shindan = new App(app, rule).create()
