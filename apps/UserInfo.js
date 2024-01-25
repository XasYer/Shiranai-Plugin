import {
    findUser,
    createUser,
    updateUser,
    getDaysBetweenDates,
    generateRandomInteger,
    reply
} from '../models/index.js'

let cd = null

export class game extends plugin {
    constructor() {
        super({
            name: '游戏金币签到',
            dsc: '游戏金币签到',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#?金币签到$/,
                    fnc: 'sign'
                },
            ]
        })
    }

    async sign(e) {
        const user_id = e.raw?.sender?.user_id || e.raw?.operator_id || e.user_id
        if (cd) {
            return reply(e, `<@${user_id}>\r不可以这么快哦`)
        } else {
            cd = setTimeout(() => {
                cd = false
            }, 60 * 1000)
        }
        let user_info = await findUser(user_id)
        if (!user_info) {
            user_info = await createUser(user_id)
        }
        const last_sign = getDaysBetweenDates(user_info.last_sign)
        let msg
        if (!last_sign && user_info.last_sign) {
            // 已经签到过了
            switch (generateRandomInteger(0, 2)) {
                case 0:
                    msg = `今天已经签到过了,作为惩罚,菜菜拿掉了你的1个金币`
                    user_info.currency--
                    break;
                case 1:
                    msg = `今天已经签到过了,所以这次什么也没有获得`
                    break
                case 2:
                    msg = `今天已经签到过了,但是菜菜还是给了你1个金币`
                    user_info.currency++
                    break;
            }
        } else {
            const i = generateRandomInteger(10, 20)
            msg = `签到成功~获得${i}个金币`
            user_info.currency += i
            user_info.sign_count++
        }
        msg += `\r已签到${user_info.sign_count}天\r现在有${user_info.currency}个金币`
        await updateUser(user_id, user_info)
        return await reply(e, `<@${user_id}>\r${msg}`, [[{ text: '我也要签到', callback: '/金币签到' }]])
    }
}