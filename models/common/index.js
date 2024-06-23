import fs from 'fs'
import YAML from 'yaml'
import { join, extname } from 'path'
import { Version } from '#components'

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
      case '.yaml':
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

/**
 * 移动文件或文件夹到指定路径
 * @param {string} sourcePath 原路径
 * @param {string} targetPath 新路径
 */
function moveFileOrFolder (sourcePath, targetPath) {
  // 判断源文件或文件夹是否存在
  if (!fs.existsSync(sourcePath)) {
    return
  }
  // 获取源文件或文件夹的状态信息
  const stats = fs.statSync(sourcePath)

  if (stats.isFile()) {
    // 如果是文件，则移动文件
    fs.renameSync(sourcePath, targetPath)
  } else if (stats.isDirectory()) {
    // 如果是文件夹，则递归移动文件夹中的内容
    moveFolderContents(sourcePath, targetPath)
  }
}

/**
 * 移动文件夹到指定路径
 * @param {string} sourceDir 原路径
 * @param {string} targetDir 新路径
 */
function moveFolderContents (sourceDir, targetDir) {
  // 创建目标文件夹
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  // 读取源文件夹中的内容
  const files = fs.readdirSync(sourceDir)

  // 遍历文件夹中的每个文件或子文件夹
  files.forEach(file => {
    const sourcePath = join(sourceDir, file)
    const targetPath = join(targetDir, file)
    moveFileOrFolder(sourcePath, targetPath)
  })

  // 移动完所有文件后，删除源文件夹
  fs.rmdirSync(sourceDir)
}

/**
 * 创建文件夹
 * @param  {...string} dirPath 路径
 */
function mkdirSync (...dirPath) {
  let path = Version.pluginPath
  for (const i of dirPath) {
    path = join(path, i)
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
  }
}

export {
  getDaysBetweenDates,
  getTime,
  generateRandomInteger,
  setTimer,
  sleep,
  readFile,
  writeFile,
  moveFileOrFolder,
  moveFolderContents,
  mkdirSync
}
