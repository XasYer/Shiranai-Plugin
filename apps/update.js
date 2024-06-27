import _ from 'lodash'
import { App, Version } from "#components"
import { Update, Restart, common } from "#lib"

let uping = false

export const app = {
  id: 'ShiranaiUpdate',
  name: '希腊奶更新'
}

export const rule = {
  update: {
    reg: /^#希腊奶(插件)?(强制)?更新$/,
    fnc: update,
    cfg: {
      permission: 'master'
    }
  },
  updateLog: {
    reg: /^#希腊奶(插件)?更新日志$/,
    fnc: updateLog,
  }
}

export const ShiranaiUpdate = new App(app, rule).create()

async function update(e) {
  if (uping) {
    e.reply(`正在更新${ Version.pluginName }，请稍后...`)
    return false
  }
  uping = true
  setTimeout(() => { uping = false }, 300 * 1000)
  if (Version.BotName === 'Karin') {
    let [name, cmd] = [Version.pluginName, 'git pull']
    if (e.msg.includes('强制')) cmd = 'git reset --hard && git pull --allow-unrelated-histories'
    try {
      const { data } = await Update.update(Version.pluginPath, cmd)
      let msg = `更新${name}...${_.isObject(data) ? `${data.message}\n${data.stderr}` : data}`
      await e.bot.sendForwardMessage(e.contact, common.makeForward(msg))
      if (!data.includes('更新成功')) return true
      try {
        await e.reply(`\n更新完成，开始重启 本次运行时间：${common.uptime()}`, { at: true })
        const restart = new Restart(e)
        restart.e = e
        await restart.CmdRestart()
        return true
      } catch (error) {
        return e.reply(`${Version.pluginName}重启失败，请重启应用更新！`)
      }
    } catch (error) {
      return e.reply(`更新失败：${error.message}`, { at: true })
    } finally {
      uping = false
    }
  } else {
    try {
      e.msg = `#${e.msg.includes("强制") ? "强制" : ""}更新${Version.pluginName}`
      const up = new Update(e)
      up.e = e
      return up.update()
    } catch (error) {} finally {
      uping = false
    }
  }
}

async function updateLog(e) {
  if (Version.BotName === 'Karin') {
    e.msg = `#更新日志 10 ${Version.pluginName}`
    const msg = e.msg.replace(/#更新日志/, '').trim()
    let [count, name] = msg.split(' ')
    if (count > 100) {
      return e.reply('最多只能查100条更新日志', { at: true })
    }
    if (!count) count = 10
    try {
      const data = await Update.getCommit({ path: Version.pluginPath, count })
      let msg = [`${name} 更新日志(${count || '10'}条)`, data.trimEnd()]
      await e.bot.sendForwardMessage(e.contact, common.makeForward(msg))
    } catch (error) {
      return e.reply(`\n获取更新日志失败：\n${e.msg}`, { at: true })
    }
  } else {
    e.msg = `#更新日志${Version.pluginName}`
    const up = new Update(e)
    up.e = e
    return up.updateLog(Version.pluginName)
  }
}
