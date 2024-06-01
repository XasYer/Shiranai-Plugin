import Version from './Version.js'

export default class {
  constructor ({
    id,
    name,
    dsc,
    event = 'message',
    priority = 5001
  }) {
    this.id = id
    this.name = name
    this.dsc = dsc || name
    this.event = event
    this.priority = priority
    this.apps = []
  }

  rule (name, reg, fnc, cfg = {}) {
    this.apps.push({ name, reg, fnc, cfg })
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
        if (!Version.isTrss) {
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
}
