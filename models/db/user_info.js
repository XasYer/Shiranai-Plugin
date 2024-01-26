import { sequelize, DataTypes, executeSync, Op } from './base.js'

let user_info_table = sequelize.define('user_info', {
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
    win_count: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        comment: '胜的场数'
    },
    winning: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '胜率'
    }
}, {
    timestamps: true
});
/*

*/
// 同步数据库模型
await sequelize.sync()

/**
 * 创建一个新用户
 * @param {string} user_id - 用户的唯一标识符。
 * 该函数创建一个具有默认值的新用户条目。name 为空字符串，其他数值型字段默认为 0。
 */
async function createUser(user_id) {
    user_id = String(user_id)
    return executeSync(async () => {
        return (await user_info_table.create({
            user_id,
        }, {
            raw: true
        })).dataValues
    });
}

/**
 * 更新一个现有用户的信息
 * @param {string} user_id - 要更新的用户的唯一标识符。
 * @param {{name:string?,currency:number?,sign_count:number?,game_count:number?,win_count:number}} updateValues - 一个包含要更新字段的对象。
 * @param {'id'|'user_id'} type - 根据id还是user_id查询,默认user_id 
 * 
 * 例如，要更新 name 和 currency，传入 { name: '新名字', currency: 100 }。
 * 可以包含任何 user_info 表中的字段。
 */
async function updateUser(user_id, updateValues, type = 'user_id') {
    const where = {}
    if (type == 'id') {
        where.id = Number(user_id)
    } else {
        where.user_id = String(user_id)
    }
    return executeSync(async () => {
        if (updateValues.hasOwnProperty('game_count') && updateValues.hasOwnProperty('win_count')) {
            updateValues.winning = updateValues.game_count > 0 ? Math.floor((updateValues.win_count / updateValues.game_count) * 100) : 0;
        } else if (updateValues.hasOwnProperty('game_count') || updateValues.hasOwnProperty('win_count')) {
            const user = await user_info_table.findOne({ where });
            const gameCount = updateValues.game_count != null ? updateValues.game_count : user.game_count;
            const winCount = updateValues.win_count != null ? updateValues.win_count : user.win_count;
            updateValues.winning = gameCount > 0 ? Math.floor((winCount / gameCount) * 100) : 0;
        }
        if (updateValues.hasOwnProperty('sign_count')) {
            const now = new Date();
            now.setHours(now.getHours() + 8);
            updateValues.last_sign = now.toISOString().split('T').shift();
        }
        return await user_info_table.update(updateValues, {
            where
        });
    });
}

/**
 * 查询一个特定用户的信息
 * @param {number|string} user_id - 要查询的用户的唯一标识符。
 * @param {'id'|'user_id'} type - 根据id还是user_id查询,默认user_id 
 */
async function findUser(user_id, type = 'user_id') {
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
        });
    });
}

/**
 * 根据指定字段对用户进行排序查询
 * @param {'currency'|'sign_count'|'game_count'|'win_count'|'winning'} field - 要排序的字段
 * @param {'ASC'|'DESC'} order - 排序方式，'ASC' 为升序，'DESC' 为降序。
 * @param {number} limit - 查询结果的数量限制。
 */
async function findUsersSortedBy(field, order = 'DESC', limit = 10) {
    return executeSync(async () => {
        return await user_info_table.findAll({
            order: [
                [field, order],
                ['updatedAt', 'ASC']
            ],
            limit,
            raw: true
        });
    });
}

/**
 * 查询用户总数
 * 该函数返回 user_info 表中的用户总数。
 */
async function countUsers() {
    return executeSync(async () => {
        return await user_info_table.count();
    });
}

export {
    createUser,
    updateUser,
    findUser,
    findUsersSortedBy,
    countUsers
}