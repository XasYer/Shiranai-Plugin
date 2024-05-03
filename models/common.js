import { join, extname } from 'path'
import { Version } from '../components/index.js'
import fs from 'fs'
import YAML from 'yaml'

/**
 * 计算两个日期之间相差的天数
 * @param {string} lastDate - 上次的日期，格式为 'yyyy-mm-dd'。
 * @returns {number} 两个日期相差的天数。
 */
function getDaysBetweenDates (lastDate) {
  if (!lastDate) return 0
  const lastSign = new Date(lastDate)
  const today = new Date()

  // 将时间设置为当天的开始（即午夜）
  lastSign.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  // 计算相差的毫秒数并转换为天数
  const diffTime = Math.abs(today - lastSign)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

/**
 * 获得日期
 * @param {number} [d=0] 相差的天数
 * @returns {string} yyyy-mm-dd
 */
function getTime (d = 0) {
  const now = new Date()
  now.setHours(now.getHours() + 8)
  if (d != 0) now.setDate(now.getDate() + d)
  return now.toISOString().split('T').shift()
}

/**
 * 生成最小值到最大值之间的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns
 */
function generateRandomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 转换成Button
 * @param {Array<Array<button>} buttons
 *
 * @typedef {Object} button
 * @property {string} text 显示值
 * @property {string?} callback 回调
 * @property {string?} input 输入
 * @property {Boolean?} send 直接发送
 * @property {string|Array<string>|undefined} permission 有权限点击的用户
 * @property {Object?} QQBot 其他参数
 *
 * @returns {Object} segment处理后的按钮
 */
function toButton (buttons) {
  if (Version.isTrss) {
    return segment.button(...buttons)
  } else {
    return Bot.Button(buttons)
  }
}

/**
 * 设置一个setTimeout
 * @param {Object} e
 * @param {Number} time 超时时间,秒
 * @param {string} msg 时间结束后发送的消息
 * @param {Function} callback 时间结束后执行的方法
 */
function setTimer (e, time, msg, callback = () => { }) {
  return setTimeout(() => {
    callback()
    if (msg) {
      e.reply(msg)
    }
  }, time * 1000)
}

/**
 * 休眠指定时间
 * @param {number} ms 毫秒
 */
function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 读取文件返回内容
 * @param {string} path 相对路径 Shiranai-plugin/之后的路径
 * @param {{default:any}} options 配置项
 */
function readFile (path, options = {}) {
  // 判断是否有这个路径,没有则创建
  const ext = extname(path)
  const filePath = join(Version.pluginPath, path)
  // 判断是否有这个文件,如果没有再看看有没有default值,有则写入,没有则返回undefined
  if (!fs.existsSync(filePath)) {
    if (options.default) {
      switch (ext) {
        case '.json':
          fs.writeFileSync(filePath, JSON.stringify(options.default, null, 2), 'utf-8')
          return options.default
        case '.yaml':
        case '.yml':
          fs.writeFileSync(filePath, YAML.stringify(options.default), 'utf-8')
          return options.default
        default:
          fs.writeFileSync(filePath, options.default, 'utf-8')
          return options.default
      }
    }
    return undefined
  } else {
    const data = fs.readFileSync(filePath, 'utf-8')
    switch (ext) {
      case '.json':
        return JSON.parse(data)
      case 'yaml':
      case '.yml':
        return YAML.parse(data)
      default:
        return data
    }
  }
}

/**
 * 写入文件
 * @param {string} path 相对路径 Shiranai-plugin/之后的路径
 * @param {any} data 需要写入的数据
 */
function writeFile (path, data) {
  const ext = extname(path)
  const filePath = join(Version.pluginPath, path)
  switch (ext) {
    case '.json':
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
      break
    case '.yaml':
    case '.yml':
      fs.writeFileSync(filePath, YAML.stringify(data), 'utf-8')
      break
    default:
      fs.writeFileSync(filePath, data, 'utf-8')
      break
  }
}

export {
  getDaysBetweenDates,
  getTime,
  generateRandomInteger,
  toButton,
  setTimer,
  sleep,
  readFile,
  writeFile
}
