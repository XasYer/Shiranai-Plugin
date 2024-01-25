import { findUser, findUsersSortedBy, createUser, updateUser, countUsers } from './user_info.js'

// await findUsersSortedBy('currency', 'DESC', 10)

// console.log(await countUsers())

// console.log(await findUser('1'));

// console.log(await findUsersSortedBy('currency'));

console.log(await createUser('3889000138'));

// console.log(await updateUser('1', { sign_count: 1 }));

// console.log(daysBetweenDates('2024-01-25'));

// console.log(Math.floor(Math.random() * 3));

/**
 * 计算两个日期之间相差的天数
 * @param {string} lastSignDate - 上次签到的日期，格式为 'yyyy-mm-dd'。
 * @returns {number} 两个日期相差的天数。
 */
function daysBetweenDates(lastSignDate) {
    const lastSign = new Date(lastSignDate);
    const today = new Date();

    // 将时间设置为当天的开始（即午夜）
    lastSign.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 计算相差的毫秒数并转换为天数
    const diffTime = Math.abs(today - lastSign);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}
