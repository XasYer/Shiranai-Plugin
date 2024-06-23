import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Version } from '#components'
import TaskQueue from './TaskQueue.js'
import { Sequelize, DataTypes, Op } from 'sequelize'
import { moveFileOrFolder, mkdirSync } from '#models'

mkdirSync('data', 'db', 'sqlite')

const dataPath = join(Version.pluginPath, 'data', 'db', 'sqlite', 'data.db')

// 移动旧data.db文件到新路径
moveFileOrFolder(join(Version.pluginPath, 'models', 'db', 'data.db'), dataPath)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dataPath,
  logging: false
})

await sequelize.authenticate()

const taskQueueConfig = 10
const shouldCancel = false
let executeSync

if (taskQueueConfig > 0) {
  const taskQueue = new TaskQueue(taskQueueConfig)
  executeSync = (callback) => {
    if (shouldCancel) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Cancelled')
    }
    return taskQueue.runTask(callback)
  }
} else {
  executeSync = (callback) => {
    return callback()
  }
}

const alter = (() => {
  const alter_path = join(__dirname, 'alter.json')
  const proc_path = join(__dirname, 'alter_proc.json')
  const alter_data = JSON.parse(fs.readFileSync(alter_path, 'utf-8'))
  const keys = Object.keys(alter_data)
  if (!fs.existsSync(proc_path)) {
    fs.copyFileSync(alter_path, proc_path)
    return keys.reduce((acc, i) => {
      acc[i] = false
      return acc
    }, {})
  }
  const proc_data = JSON.parse(fs.readFileSync(proc_path, 'utf-8'))
  fs.copyFileSync(alter_path, proc_path)
  return keys.reduce((acc, i) => {
    if (!proc_data[i] || (alter_data[i] > proc_data[i])) {
      acc[i] = true
    } else {
      acc[i] = false
    }
    return acc
  }, {})
})()

export {
  sequelize,
  DataTypes,
  Op,
  executeSync,
  alter
}
