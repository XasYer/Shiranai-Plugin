import Version from './Version.js'
import lodash from 'lodash'
import { plugin, logger } from '#lib'

export default class {
  constructor ({
    id,
    name,
    dsc,
    event = 'message',
    priority = 5001
  }, rule) {
    this.id = id
    this.name = name
    this.dsc = dsc || name
    this.event = event
    this.priority = priority
    this.apps = []
    this.rule(rule)
  }

  rule (name, reg, fnc, cfg = {}) {
    if (!name) return false
    if (lodash.isPlainObject(name)) {
      lodash.forEach(name, (p, k) => {
        this.rule(k, p.reg, p.fnc, p.cfg)
      })
    } else {
      this.apps.push({ name, reg, fnc, cfg })
    }
  }

  create () {
    const { name, dsc, event, priority } = this
    const rule = []
    const cls = class extends plugin {
      constructor () {
        super({
          name: `[${Version.pluginName}]` + name,
          dsc: dsc || name,
          event,
          priority,
          rule
        })
      }

      accept (e) {
        if (Version.BotName !== 'Trss-Yunzai') {
          e.adapter_name = e.adapter || 'ICQQ'
        }
      }
    }

    for (const { name, reg, fnc, cfg } of this.apps) {
      rule.push({
        reg,
        fnc: name,
        ...cfg
      })
      cls.prototype[name] = fnc
    }
    return cls
  }

  async change () {
    try {
      switch (Version.BotName) {
        case 'Karin': {
          const dir = Version.pluginName + '/apps'
          const name = this.id + '.js'
          const PluginsLoader = (await import('../../../lib/plugins/loader.js')).default
          PluginsLoader.uninstallApp(dir, name)
          PluginsLoader.createdApp(dir, name, true)
          break
        }
        case 'Trss-Yunzai':
        case 'Miao-Yunzai': {
          const PluginsLoader = (await import('../../../lib/plugins/loader.js')).default
          const App = this.create()
          const key = Version.pluginName
          const plugin = new App()
          for (const i in PluginsLoader.priority) {
            if (PluginsLoader.priority[i].key === key && PluginsLoader.priority[i].name === plugin.name) {
              PluginsLoader.priority[i].class = App
              PluginsLoader.priority[i].priority = plugin.priority
              break
            }
          }
          PluginsLoader.priority = lodash.orderBy(PluginsLoader.priority, ['priority'], ['asc'])
          break
        }
        default:
          return false
      }
    } catch (error) {
      logger.error(`[${Version.pluginName}]重载js: apps/${this.id}.js错误\n`, error)
    }
  }
}
