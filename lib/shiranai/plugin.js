import { Version } from '#components'

const plugin = await (async () => {
  switch (Version.BotName) {
    case 'Karin':
      return (await import('#Karin')).plugin
    case 'Miao-Yunza V4':
      return (await import('yunzai/core')).Plugin
    default:
      return global.plugin
  }
})()

export default plugin
