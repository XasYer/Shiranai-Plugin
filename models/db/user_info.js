import { sequelize, DataTypes, executeSync, alter } from './base.js'
import { logger } from '#lib'

/**
 * @typedef {Object} user_info
 * @property {number} id id
 * @property {string} user_id 账号
 * @property {string} name 昵称
 * @property {number} currency 货币数量
 * @property {number} sign_count 签到次数
 * @property {number} sign_get 通过签到获得的金币数
 * @property {string} last_sign 最后一次签到时间
 * @property {number} game_count 游戏场数
 * @property {number} game_send 游戏失败送出的金币数
 * @property {number} game_get 游戏成功获得的金币数
 * @property {number} game_win_count 赢游戏的场数
 * @property {number} game_winning 游戏胜率
 * @property {number} rob_count 抢金币次数
 * @property {number} rob_send 抢金币失败送出的金币数
 * @property {number} rob_get 抢金币成功获得的金币数
 * @property {number} rob_win_count 抢金币成功次数
 * @property {number} rob_winning 抢金币成功率
 * @property {number} give_count 送金币次数
 * @property {number} give_send 总共送出的金币数量
 * @property {number} draw_count 抽金币次数
 * @property {number} draw_send 抽金币失败送出的金币数
 * @property {number} draw_get 抽金币成功获得的金币数
 * @property {number} draw_win_count 抽中金币的次数
 * @property {number} draw_winning 抽中金币成功率
 * @property {number} beg_count 乞讨次数
 * @property {number} beg_send 乞讨失败送出的金币数
 * @property {number} beg_get 乞讨成功获得的金币数
 * @property {number} beg_win_count 乞讨成功的次数
 * @property {number} beg_winning 乞讨成功率
 */
const user_info_table = sequelize.define('user_info', {
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
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: '昵称'
  },
  currency: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '货币数量'
  },
  sign_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '签到次数'
  },
  sign_get: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '通过签到获得的金币数'
  },
  last_sign: {
    type: DataTypes.DATEONLY,
    defaultValue: null,
    comment: '最后一次签到时间'
  },
  game_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '游戏场数'
  },
  game_send: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '游戏失败送出的金币数'
  },
  game_get: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '游戏成功获得的金币数'
  },
  game_win_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '游戏胜的场数'
  },
  game_winning: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '游戏胜率'
  },
  rob_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抢金币次数'
  },
  rob_send: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抢金币成功获得的金币数'
  },
  rob_get: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抢金币失败送出的金币数'
  },
  rob_win_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抢金币胜的场数'
  },
  rob_winning: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '抢金币胜率'
  },
  give_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '送金币次数'
  },
  give_send: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '送金币的数量'
  },
  draw_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抽金币次数'
  },
  draw_send: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抽金币失败送出的金币数'
  },
  draw_get: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抽金币成功获得的金币数'
  },
  draw_win_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '抽金币拿到金币的次数'
  },
  draw_winning: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '抽金币胜率'
  },
  beg_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '乞讨次数'
  },
  beg_send: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '乞讨失败送出的金币数'
  },
  beg_get: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '乞讨成功获得的金币数'
  },
  beg_win_count: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    comment: '乞讨成功的次数'
  },
  beg_winning: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '乞讨成功率'
  }
}, {
  timestamps: true
})
/*
*/
// 同步数据库模型
const isAlter = alter.user_info
if (isAlter) {
  logger.info('[Shiranai-Plugin]', 'user_info表新增字段,正在同步中,可能需要一定时间,请耐心等待...')
}
await sequelize.sync({ alter: isAlter })

/**
 * 创建一个新用户
 * @param {string} user_id - 用户的唯一标识符。
 * @returns {Promise<user_info>}
 * 该函数创建一个具有默认值的新用户条目。name 为空字符串，其他数值型字段默认为 0。
 */
async function createUser (user_id) {
  user_id = String(user_id)
  return executeSync(async () => {
    return (await user_info_table.create({
      user_id
    }, {
      raw: true
    })).dataValues
  })
}

/**
 * 更新一个现有用户的信息
 * @param {string} user_id - 要更新的用户的唯一标识符。
 * @param {user_info} updateValues - 一个包含要更新字段的对象。
 * @param {'id'|'user_id'} type - 根据id还是user_id查询,默认user_id
 *
 * 例如，要更新 name 和 currency，传入 { name: '新名字', currency: 100 }。
 * 可以包含任何 user_info 表中的字段。
 */
async function updateUser (user_id, updateValues, type = 'user_id') {
  const where = {}
  if (type == 'id') {
    where.id = Number(user_id)
  } else {
    where.user_id = String(user_id)
  }
  return executeSync(async () => {
    if (Object.prototype.hasOwnProperty.call(updateValues, 'game_count') && Object.prototype.hasOwnProperty.call(updateValues, 'game_win_count')) {
      updateValues.game_winning = updateValues.game_count > 0 ? Math.floor((updateValues.game_win_count / updateValues.game_count) * 100) : 0
    }
    if (Object.prototype.hasOwnProperty.call(updateValues, 'rob_count') && Object.prototype.hasOwnProperty.call(updateValues, 'rob_win_count')) {
      updateValues.rob_winning = updateValues.rob_count > 0 ? Math.floor((updateValues.rob_win_count / updateValues.rob_count) * 100) : 0
    }
    if (Object.prototype.hasOwnProperty.call(updateValues, 'draw_count') && Object.prototype.hasOwnProperty.call(updateValues, 'draw_win_count')) {
      updateValues.draw_winning = updateValues.draw_count > 0 ? Math.floor((updateValues.draw_win_count / updateValues.draw_count) * 100) : 0
    }
    if (Object.prototype.hasOwnProperty.call(updateValues, 'beg_count') && Object.prototype.hasOwnProperty.call(updateValues, 'beg_win_count')) {
      updateValues.beg_winning = updateValues.beg_count > 0 ? Math.floor((updateValues.beg_win_count / updateValues.beg_count) * 100) : 0
    }
    return await user_info_table.update(updateValues, {
      where
    })
  })
}

/**
 * 查询一个特定用户的信息
 * @param {number|string} user_id - 要查询的用户的唯一标识符。
 * @param {'id'|'user_id'} type - 根据id还是user_id查询,默认user_id
 * @returns {Promise<user_info>}
 */
async function findUser (user_id, type = 'user_id') {
  const where = {}
  if (type == 'id') {
    where.id = Number(user_id)
  } else {
    where.user_id = String(user_id)
  }
  return executeSync(async () => {
    return await user_info_table.findOne({
      where,
      raw: true
    })
  })
}

/**
 * 根据指定字段对用户进行排序查询
 * @param {user_info} field - 要排序的字段
 * @param {'ASC'|'DESC'} order - 排序方式，'ASC' 为升序，'DESC' 为降序。
 * @param {number} limit - 查询结果的数量限制。
 * @returns {Promise<user_info[]>}
 */
async function findUsersSortedBy (field, order = 'DESC', limit = 10) {
  return executeSync(async () => {
    return await user_info_table.findAll({
      order: [
        [field, order],
        ['updatedAt', 'ASC']
      ],
      limit,
      raw: true
    })
  })
}

/**
 * 查询用户总数
 * 该函数返回 user_info 表中的用户总数。
 */
async function countUsers () {
  return executeSync(async () => {
    return await user_info_table.count()
  })
}

export {
  user_info_table,
  createUser,
  updateUser,
  findUser,
  findUsersSortedBy,
  countUsers
}
