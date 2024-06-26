import { App, Render, Version } from '#components'
import lodash from 'lodash'
import { helpCfg, helpList, helpTheme } from '#models'

export const app = {
  id: 'help',
  name: '帮助'
}

export const rule = {
  help: {
    reg: /^#?(Shiranai|希腊奶)(帮助|菜单|help)$/i,
    fnc: help
  },
  version: {
    reg: /^#?(Shiranai|希腊奶)(版本|version)$/i,
    fnc: version
  }
}

export const helpApp = new App(app, rule).create()

async function help (e) {
  const helpGroup = []

  lodash.forEach(helpList, (group) => {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      return true
    }

    lodash.forEach(group.list, (help) => {
      const icon = help.icon * 1
      if (!icon) {
        help.css = 'display:none'
      } else {
        const x = (icon - 1) % 10
        const y = (icon - x - 1) / 10
        help.css = `background-position:-${x * 50}px -${y * 50}px`
      }
    })

    helpGroup.push(group)
  })
  const themeData = await helpTheme.getThemeData(helpCfg)
  console.log('themeData', themeData)
  console.log('helpCfg', helpCfg)
  console.log('helpGroup', helpGroup)
  const img = await Render.render('help/index', {
    helpCfg,
    helpGroup,
    ...themeData,
    scale: 1.2
  })
  return await e.reply(img)
}

async function version (e) {
  const img = await Render.render('help/version-info', {
    currentVersion: Version.version,
    changelogs: Version.changelogs,
    scale: 1.2
  })
  return await e.reply(img)
}
