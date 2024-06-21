import { Level } from 'level'
import { Version } from '#components'
import { logger } from '#lib'

export default class level {
  constructor (path) {
    this.db = new Level(path, { valueEncoding: 'json' })
  }

  async open () {
    await this.db.open()
  }

  /**
   * 存储一个值
   * @param {string} key
   * @param {any} value
   * @returns
   */
  async set (key, value) {
    if (!value) return
    await this.db.put(key, value)
  }

  async get (key) {
    try {
      return await this.db.get(key)
    } catch (err) {
      // 不存在key
      if (err.notFound) {
        return null
      }
      // 其他错误
      logger.error(`[${Version.pluginName}] level error`, err)
      return null
    }
  }

  close () {
    this.db.close()
  }
}
