import { App, Version } from '#components'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import { logger } from '#lib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'))

const apps = {}
for (const i of files) {
  if (i === 'index.js') continue
  try {
    const exp = await import(`file://${join(__dirname, i)}`)
    const app = new App(exp.app)
    for (const key in exp.rule) {
      const rule = exp.rule[key]
      app.rule(key, rule.reg, rule.fnc, rule.cfg)
    }
    apps[app.id] = app.create()
  } catch (error) {
    logger.error(`[${Version.pluginName}]加载js: apps/${i}错误\n`, error)
  }
}

export { apps }
