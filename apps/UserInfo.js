import {
    findUser,
    createUser,
    updateUser,
    findUsersSortedBy,
    countUsers,
    getDaysBetweenDates,
    getNowDate,
    generateRandomInteger,
} from '../models/index.js'

export class game extends plugin {
    constructor() {
        super({
            name: '游戏金币签到',
            dsc: '游戏金币签到',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#?金币大作战$/,
                    fnc: 'help'
                },
                {
                    reg: /^#?金币签到$/,
                    fnc: 'sign'
                },
                {
                    reg: /^#?金币排行榜?$/,
                    fnc: 'rank'
                },
                {
                    reg: /^#?抢金币\s*\d*$/,
                    fnc: 'rob'
                },
                {
                    reg: /^#?送金币\s*(\d+|\d+[\s\*]+\d+)$/,
                    fnc: 'give'
                },
                {
                    reg: /^#?金币抽奖$/,
                    fnc: 'draw'
                },
                {
                    reg: /^#?修?改(名字?|昵称)\s*.+$/,
                    fnc: 'rename'
                },
                // {
                //     reg: /^#?乞讨$/,
                //     fnc: 'beg'
                // }
                {
                    reg: /^#?我的信息$/,
                    fnc: 'info'
                }
            ]
        })
    }

    async help(e) {
        e.toQQBotMD = true
        return await e.reply([`金币小游戏,所有指令均有一分钟cd,更多小游戏正在开发中...敬请期待`, segment.button(
            [
                { text: '金币签到', callback: '/金币签到' },
            ],
            [
                { text: '抢金币', input: '/抢金币' },
                { text: '抽金币', callback: '/金币抽奖' },
                { text: '金币排行', callback: '/金币排行' },
            ],
            [
                { text: '赚金币', callback: '/数字游戏' }
            ]
        )])
    }

    async sign(e) {
        const user_id = getUserId(e)
        if (getCD(e, 'sign')) {
            return e.reply(`不可以这么快哦`)
        }
        const user_info = await getUserInfo(e)
        const last_sign = getDaysBetweenDates(user_info.last_sign)
        let msg
        if (!last_sign && user_info.last_sign) {
            // 已经签到过了
            switch (generateRandomInteger(0, 2)) {
                case 0:
                    if (user_info.currency > 0) {
                        msg = `今天已经签到过了,作为惩罚,菜菜拿走了你的1个金币`
                        user_info.currency--
                        user_info.sign_get--
                    } else {
                        msg = `菜菜看你连1个金币也没有,所以菜菜给了你1个金币`
                        user_info.currency++
                        user_info.sign_get++
                    }
                    break;
                case 1:
                    msg = `今天已经签到过了,所以这次什么也没有获得`
                    break
                case 2:
                    msg = `今天已经签到过了,但是菜菜还是给了你1个金币`
                    user_info.currency++
                    user_info.sign_get++
                    break;
            }
        } else {
            const i = generateRandomInteger(10, 20)
            msg = `签到成功~获得${i}个金币`
            user_info.currency += i
            user_info.sign_count++
            user_info.sign_get += i
            user_info.last_sign = getNowDate()
        }
        msg += `\r已签到${user_info.sign_count}天\r现在有${user_info.currency}个金币`
        await updateUser(user_id, user_info)
        e.toQQBotMD = true
        const buttons = [
            [
                { text: '我也要签到', callback: '/金币签到' },
            ],
            [
                { text: '抢金币', input: '/抢金币' },
                { text: '抽金币', callback: '/金币抽奖' },
                { text: '金币排行', callback: '/金币排行' },
            ]
        ]
        return await e.reply([
            segment.at(user_id),
            `\rID: ${user_info.id}\t\t昵称: ${user_info.name}\r${msg}`,
            segment.button(...buttons)
        ])
    }

    async rank(e) {
        const rankList = await findUsersSortedBy('currency', 'DESC', 10)
        if (!rankList || rankList.length == 0) {
            return await e.reply(['还没有排名哦'])
        }
        let msg = '\r#金币排行榜\r\r>'
        let index = 1
        for (const i of rankList) {
            if (index != 1) {
                msg += '\r'
            }
            msg += `#No.${index}\rID: ${i.id}\t\t金币: ${i.currency}\t\t昵称: ${i.name}`
            index++
        }
        const buttons = [
            [
                { text: '改名字', input: '/改名' }
            ]
        ]
        e.toQQBotMD = true
        return await e.reply([msg, segment.button(...buttons)])
    }

    async rob(e) {
        const user_id = getUserId(e)
        if (getCD(e, 'rob', 60)) {
            return e.reply(`不可以这么快哦`)
        }
        e.toQQBotMD = true
        const user_info = await getUserInfo(e)
        if (user_info.currency < 10) {
            return await e.reply([
                segment.at(user_id),
                `金币太少了哦,大于10个金币再来吧\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}\r>剩余金币: ${user_info.currency}`
            ])
        }
        const type = generateRandomInteger(1, 100) < 40 ? '增加' : '减少'
        let i
        switch (generateRandomInteger(0, 2)) {
            case 0:
                i = generateRandomInteger(1, 5)
                break;
            case 1:
                i = generateRandomInteger(5, 10)
                break;
            case 2:
                i = generateRandomInteger(10, 15)
                break;
        }
        let id = e.msg.replace(/^#?抢金币\s*/, '')
        let msg
        if (id == user_info.id) {
            user_info.rob_count++
            // 指定抢自己
            if (type === '增加') {
                msg = `一时兴起，你决定尝试一个疯狂的想法：抢自己的金币。你仔细检查了自己的所有隐秘角落，结果找到了${i}个金币。`
                user_info.currency += i
                user_info.rob_get += i
                user_info.rob_win_count++
            } else {
                if (user_info.currency < i) {
                    i = user_info.currency
                }
                user_info.currency -= i
                user_info.rob_send += i
                msg = `一时兴起，你决定尝试一个疯狂的想法：抢自己的金币。你仔细检查了自己的所有隐秘角落，什么也没找到，摸了摸口袋，发现丢了${i}个金币。`
            }
        } else {
            if (!id) {
                id = generateRandomInteger(1, await countUsers())
            }
            user_info.rob_count++
            if (id == user_info.id) {
                if (type === '增加') {
                    msg = `在这个风雨交加的夜晚，你准备抢一个陌生人的金币。但在视线模糊中，你误闯进了自己的家。你在沙发垫下意外地找到了${i}个金币。`
                    user_info.currency += i
                    user_info.rob_get += i
                    user_info.rob_win_count++
                } else if (type === '减少') {
                    if (user_info.currency < i) {
                        i = user_info.currency
                    }
                    user_info.currency -= i
                    user_info.rob_send += i
                    msg = `在这个风雨交加的夜晚，你准备抢一个陌生人的金币。但在视线模糊中，你误闯进了自己的家。你原本计划完美，但事与愿违。在离开现场时，你的口袋破了一个洞，${i}个金币不翼而飞。`
                }
            } else {
                const target = await findUser(id, 'id')
                if (!target) {
                    user_info.rob_count--
                    msg = `你花费了大量时间寻找${id}，但无论你怎么努力，都似乎抓不到任何关于他的线索。这种情况让你怀疑，他们是否真的存在于这个游戏之中。`
                } else {
                    if (target.currency <= 0) {
                        user_info.rob_count--
                        msg = `你小心翼翼地接近了${target.name || target.id}，准备发起突袭。但当你打开他们的金币储藏时，你震惊地发现里面空无一物。这个发现让你不禁感慨，有时候，目标并非总是如我们所愿。`
                    } else {
                        if (type === '增加') {
                            if (target.currency < i) {
                                i = currency
                            }
                            msg = `你目标明确，锁定了你的目标——${target.name || target.id}。经过周密的计划，你成功地潜入了他的领地，从中拿走了了${i}个金币。`
                            user_info.currency += i
                            user_info.rob_win_count++
                            user_info.rob_get += i
                            target.currency -= i
                        } else {
                            if (user_info.currency < i) {
                                i = currency
                            }
                            msg = `你鼓起勇气，决定对${target.name || target.id}发起挑战。但事情并不顺利，你不仅没能得手，反而损失了${i}个金币。`
                            user_info.currency -= i
                            user_info.rob_send += i
                            target.currency += i
                        }
                    }
                    await updateUser(target.user_id, target)
                }
            }
        }

        await updateUser(user_info.user_id, user_info)
        const buttons = [
            [
                { text: '我也要抢金币', input: '/抢金币' }
            ],
            [
                { text: '抽金币', callback: '/金币抽奖' },
                { text: '金币排行', callback: '/金币排行' },
                { text: '签到', callback: '/金币签到' },
            ]
        ]
        return e.reply([
            segment.at(user_id), `\r`, msg,
            `\r\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}\r>剩余金币: ${user_info.currency}\r带上id为指定抢,不带为随机抢\r每60秒只能抢一次哦`,
            segment.button(...buttons)
        ])
    }

    async give(e) {
        const user_id = getUserId(e)
        if (getCD(e, 'give', 60 * 60)) {
            return e.reply(`不可以这么快哦`)
        }
        e.toQQBotMD = true
        const reg = /^#?送金币\s*(\d+\s*|((\d+)[\s\*]+(\d+)))$/
        const i = reg.exec(e.msg)
        let id, currency = 5
        if (i[4]) {
            id = i[3].trim()
            currency = Number(i[4]) || 5
        } else {
            id = i[1]
        }
        let msg
        const user_info = await getUserInfo(e)
        const target = await findUser(id, 'id')
        if (user_info.currency < currency) {
            msg = `你想要向${id}赠送${currency}个金币，表达你的友好与慷慨，但当你查看自己的金币时，却发现自己的金库并不允许这样的大方。这个小小的难题让你有些尴尬，但你的好意已经表达。`
        } else if (!target) {
            msg = `你带着慷慨的心准备给${target}送上${currency}金币，但当你尝试进行转账时，却发现他们似乎并不存在于这个游戏中。这份未送出的礼物，成了你心中的一丝遗憾。`
        } else {
            msg = `在这个游戏的世界里，你选择了成为一个慷慨的玩家。你向${target.name || target.id}送去了${currency}个金币，这不仅是一份礼物，也是友谊的象征。`
            user_info.currency -= currency
            user_info.give_count++
            user_info.give_send += currency
            target.currency += currency
            await updateUser(user_info.user_id, user_info)
            await updateUser(target.user_id, target)
        }
        return await e.reply([
            segment.at(user_id), `\r`, msg,
            `\r\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}\r剩余金币: ${user_info.currency}`
        ])
    }

    async draw(e) {
        const user_id = getUserId(e)
        if (getCD(e, 'draw', 60)) {
            return await e.reply(`不可以这么快哦`)
        }
        e.toQQBotMD = true
        const user_info = await getUserInfo(e)
        if (user_info.currency < 5) {
            return await e.reply([
                segment.at(user_id),
                `金币太少了哦,大于10个金币再来吧\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}\r>剩余金币: ${user_info.currency}`
            ])
        }
        let prize = generateRandomInteger(-20, 20)
        user_info.draw_count++
        let msg
        if (prize < 0) {
            prize = Math.abs(prize)
            msg = `抽奖总是伴随着风险，这次你亲身体会到了这一点。虽然心中抱着赢得大奖的希望，但结果却是减少了${prize}金币。这让你更加明白，在游戏中每个决定都需要慎重。`
            if (prize > user_info.currency) {
                prize = user_info.currency
            }
            user_info.currency -= prize
            user_info.draw_send += prize
        } else if (prize > 0) {
            msg = `在这个游戏的抽奖中，风险与回报总是并存的。你小心翼翼地参与了抽奖，希望能能赢得丰厚的奖励。幸运女神微笑了，它停在了一个令人满意的位置上，获得了${prize}金币的奖励！但也有可能下次就不那么幸运了。`
            user_info.currency += prize
            user_info.draw_get += prize
        } else {
            msg = '你参与了抽奖，期待着一些令人兴奋的变化。然而，转盘停止时，你的金币数并没有任何变化。这个结果虽然平淡，但也让你避免了潜在的损失。'
        }
        await updateUser(user_info.user_id, user_info)
        const buttons = [
            [
                { text: '我也要抽奖', callback: '/金币抽奖' }
            ],
            [
                { text: '抢金币', input: '/抢金币' },
                { text: '签到', callback: '/金币签到' },
                { text: '金币排行', callback: '/金币排行' },
            ]
        ]
        return await e.reply([segment.at(user_id), '\r', msg, `\r\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}\r剩余金币: ${user_info.currency}\r奖池:-20金币到20金币\r每60秒只能抽一次哦`, segment.button(...buttons)])
    }

    async rename(e) {
        const name = e.msg.replace(/^#?修?改(名字?|昵称)\s*/, '')
        const warn = ['妈', '操', 'nm', 'nm', '爸', '爷', '草你', '日你', '.', 'everyone', '逼', '胸', '穴', '死', '插', '鸡', 'b', 'B', '淫', '杀', '你', '我', '性', '交', '加', '微信', 'wx', '屌', '狗', '尸', '乳', '生殖器', '阴道', '婊']
        if (warn.some(i => name.includes(i))) {
            return await e.reply(`修改失败\r包含违规词`)
        }
        const user_info = await getUserInfo(e)
        user_info.name = name
        await updateUser(user_info.user_id, user_info)
        return await e.reply(`修改成功~\r以后你的昵称就是: ${name}`)
    }

    async info(e) {
        const user_info = await getUserInfo(e)
        e.toQQBotMD = true
        return await e.reply([
            segment.at(user_info.user_id),
            `\r\r>ID: ${user_info.id}\t\t昵称: ${user_info.name}`,
            `\r金币: ${user_info.currency}`,
            `\r签到次数: ${user_info.sign_count}\t\t签到获得的金币: ${user_info.sign_get}`,
            `\r送金币次数: ${user_info.give_count}\t\t送出的金币: ${user_info.give_send}`,
            `\r抢金币次数: ${user_info.rob_count}\t\t抢金币成功率: ${user_info.rob_winning}%`,
            `\r抢金币获得的金币: ${user_info.rob_get}\t\t抢金币送出的金币: ${user_info.rob_send}`,
            `\r抽金币次数: ${user_info.draw_count}\t\t抽金币成功率: ${user_info.draw_winning}%`,
            `\r抽金币获得的金币: ${user_info.draw_get}\t\t抽金币送出的金币: ${user_info.draw_send}`,
            segment.button([
                { text: '我的信息', callback: '/我的信息' },
                { text: '金币签到', callback: '/金币签到' },
                { text: '改名', input: '/改名' },
            ],[
                { text: '抢金币', input: '/抢金币' },
                { text: '抽金币', callback: '/金币抽奖' },
                { text: '送金币', input: '/送金币' },
            ])
        ])
    }
}

function getUserId(e) {
    return e.raw?.sender?.user_id || e.raw?.operator_id || e.user_id
}

async function getUserInfo(e) {
    const user_id = getUserId(e)
    let user_info = await findUser(user_id)
    if (!user_info) {
        user_info = await createUser(user_id)
    }
    return user_info
}
const cd = {}
function getCD(e, type = 'default', time = 60) {
    const user_id = getUserId(e)
    if (!cd[type]) {
        cd[type] = {}
    }
    const i = cd[type]
    if (i[user_id]) {
        return true
    }
    i[user_id] = setTimeout(() => {
        i[user_id] = false
    }, time * 1000)
    return false
}