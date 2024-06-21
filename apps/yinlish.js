import { tag } from '@node-rs/jieba'
import { App, Config } from '#components'

export const app = {
  id: 'yinlish',
  name: '淫语翻译'
}

export const rule = {
  yinlish: {
    reg: /^#?淫语(翻译)?/,
    fnc: e => {
      const msg = e.msg.replace(rule.yinlish.reg, '').trim()
      if (!msg) return
      return e.reply(toYinlish(msg))
    }
  }
}

export const yinlish = new App(app, rule).create()

function wordConversion (x, y, lewdnessLevel) {
  if (Math.random() > lewdnessLevel) {
    return x
  }
  if (['，', ',', '。', '.'].includes(x)) {
    return '……'
  }
  if (x === '!' || x === '！') {
    return '❤'
  }
  if (x.length > 1 && Math.random() < 0.5) {
    return `${x[0]}……${x}`
  } else {
    if (y === 'n' && Math.random() < 0.5) {
      x = '〇'.repeat(x.length)
    }
    return `……${x}`
  }
}

function toYinlish (s, lewdnessLevel = Config.yinlish.lewdnessLevel) {
  return tag(s).map(word => wordConversion(word.word, word.tag, lewdnessLevel)).join('')
}
