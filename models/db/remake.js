import { sequelize, DataTypes, executeSync, alter } from './base.js'

/**
 * @typedef {Object} remake
 * @property {number} id id
 * @property {string} user_id 账号
 * @property {string} AEVT 已收集的事件
 * @property {number} event_collection_rate 事件收集率
 * @property {string} ATLT 已收集的天赋
 * @property {number} talent_collection_rate 天赋收集率
 * @property {string} ACHV 已收集的成就
 * @property {number} achievement_collection_rate 成就收集率
 * @property {number} times 已重开次数
 */
const remake_table = sequelize.define('remake', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    comment: '账号'
  },
  AEVT: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: '已收集的事件'
  },
  event_collection_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '事件收集率'
  },
  ATLT: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: '已收集的天赋'
  },
  talent_collection_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '天赋收集率'
  },
  ACHV: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: '已收集的成就'
  },
  achievement_collection_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '成就收集率'
  },
  times: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '已重开次数'
  }
}, {
  timestamps: true
})

// 同步数据库模型
const isAlter = alter.remake
if (isAlter) {
  logger.info('[Shiranai-Plugin]', 'remake表新增字段,正在同步中,可能需要一定时间,请耐心等待...')
}
await sequelize.sync({ alter: isAlter })

/**
 * 创建一个新用户
 * @param {string} user_id - 用户的唯一标识符。
 * @returns {Promise<remake>}
 * 该函数创建一个具有默认值的新用户条目。name 为空字符串，其他数值型字段默认为 0。
 */
async function createUser (user_id) {
  user_id = String(user_id)
  return executeSync(async () => {
    return (await remake_table.create({
      user_id
    }, {
      raw: true
    })).dataValues
  })
}

/**
 * 更新一个现有用户的信息
 * @param {string} user_id - 要更新的用户的唯一标识符。
 * @param {remake} updateValues - 一个包含要更新字段的对象。
 */
async function updateUser (user_id, updateValues) {
  user_id = String(user_id)
  return executeSync(async () => {
    if (Object.prototype.hasOwnProperty.call(updateValues, 'AEVT')) {
      let len
      if (Array.isArray(updateValues.AEVT)) {
        len = updateValues.AEVT.length
      } else if (/^\[.*\]$/.test(updateValues.AEVT)) {
        len = JSON.parse(updateValues.AEVT).length
      }
      if (len > 0) updateValues.event_collection_rate = Math.floor((len / 1720) * 100)
    }
    if (Object.prototype.hasOwnProperty.call(updateValues, 'ATLT')) {
      let len
      if (Array.isArray(updateValues.ATLT)) {
        len = updateValues.ATLT.length
      } else if (/^\[.*\]$/.test(updateValues.ATLT)) {
        len = JSON.parse(updateValues.ATLT).length
      }
      if (len > 0) updateValues.talent_collection_rate = Math.floor((len / 184) * 100)
    }
    if (Object.prototype.hasOwnProperty.call(updateValues, 'ACHV')) {
      let len
      if (Array.isArray(updateValues.ACHV)) {
        len = updateValues.ACHV.length
      } else if (/^\[.*\]$/.test(updateValues.ACHV)) {
        len = JSON.parse(updateValues.ACHV).length
      }
      if (len > 0) updateValues.achievement_collection_rate = Math.floor((len / 165) * 100)
    }
    return await remake_table.update(updateValues, {
      where: {
        user_id
      }
    })
  })
}

/**
 * 查询一个特定用户的信息
 * @param {number|string} user_id - 要查询的用户的唯一标识符。
 * @returns {Promise<remake>}
 */
async function findUser (user_id) {
  user_id = String(user_id)
  return executeSync(async () => {
    return await remake_table.findOne({
      where: {
        user_id
      },
      raw: true
    })
  })
}

/**
 * 根据指定字段对用户进行排序查询
 * @param {remake} field - 要排序的字段
 * @param {'ASC'|'DESC'} order - 排序方式，'ASC' 为升序，'DESC' 为降序。
 * @param {number} limit - 查询结果的数量限制。
 * @returns {Promise<remake[]>}
 */
async function findUsersSortedBy (field, order = 'DESC', limit = 10) {
  return executeSync(async () => {
    return await remake_table.findAll({
      order: [
        [field, order],
        ['updatedAt', 'ASC']
      ],
      limit,
      raw: true
    })
  })
}

export {
  createUser,
  updateUser,
  findUser,
  findUsersSortedBy
}
