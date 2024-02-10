import Life from '../models/remake/life.js'
import config from '../models/remake/config.js'
import { findUser, createUser } from '../models/db/remake.js'
import { setItem, saveItem } from '../models/remake/save.js';
import common from '../../../lib/common/common.js'

const cache = {}

export class remake extends plugin {
    constructor() {
        super({
            name: '[Shiranai-Plugin] 人生重开模拟器',
            dsc: '[Shiranai-Plugin] 人生重开模拟器 ',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^[#\/]?(人生重[开启来]|remake|liferestart)$/,
                    fnc: 'remake'
                },
                {
                    reg: '',
                    fnc: 'select',
                    log: false
                }
            ]
        })
    }

    async remake(e) {
        const user_id = getUserId(e)
        if (cache[user_id]) {
            delete cache[user_id]
            return await e.reply('人生重开已取消')
        }
        const data = await getUserInfo({ user_id })
        data.times++
        for (const i in data) {
            if (data[i] === '') continue
            setItem(user_id, i, data[i])
        }
        const core = new Life(user_id);
        core.config(config);
        await core.initial();
        const randTLT = core.talentRandom()
        cache[user_id] = {
            core,
            randTLT,
            type: 'TLT',
            timer: setTimer(e, 120)
        }
        return await e.reply([
            `请发送编号选择3个天赋,如"0 1 2",用空格分割,或发送"随机"随机选择\n`,
            randTLT.map((val, i) => val = `${i}.【${val.name}】: ${val.description}`).join('\n')
        ].join('\n'))
    }

    async select(e) {
        if (!e.msg) return false
        const user_id = getUserId(e)
        if (!cache[user_id]) return false
        const msg = e.msg.trim()
        clearTimeout(cache[user_id].timer)
        if (cache[user_id].type === 'TLT') {
            const randTLT = cache[user_id].randTLT
            const selectTLTRet = []
            if (msg == '随机') {
                while (true) {
                    const rand = Math.floor(Math.random() * randTLT.length)
                    const i = randTLT.splice(rand, 1)
                    selectTLTRet.push(...i)
                    if (selectTLTRet.length == 3) {
                        break
                    }
                }
            } else if (/^(\d\s+){2}\d$/.test(msg)) {
                for (let i of msg.split(/\s+/)) {
                    i = Number(i)
                    if (i < 0 || i > 9) {
                        cache[user_id].timer = setTimer(e, 120)
                        return await e.reply('请发送正确的编号')
                    }
                    const talent = randTLT[i]
                    if (selectTLTRet.some(s => s.id == talent.id)) {
                        cache[user_id].timer = setTimer(e, 120)
                        return await e.reply('不能选择相同的天赋,请重新选择')
                    }
                    selectTLTRet.push(talent)
                }
            } else {
                delete cache[user_id]
                return await e.reply('人生重开已取消')
            }
            const core = cache[user_id].core
            core.remake(selectTLTRet.map(({ id }) => id));
            let pts = core.getPropertyPoints();

            cache[user_id] = {
                core,
                pts,
                selectTLTRet,
                type: 'PTS',
                timer: setTimer(e, 120)
            }
            const limit = core.propertyAllocateLimit;
            return await e.reply([
                `请发送4个数字分配"颜值、智力、体质、家境"4个属性，如"5 5 5 5"，或发送"随机"随机选择；\n`,
                `可用属性点为${pts}，每个属性不能超过${limit[1]}`
            ].join('\n'))
        } else if (cache[user_id].type === 'PTS') {
            let selectStatsRet
            const core = cache[user_id].core
            const limit = core.propertyAllocateLimit;
            if (msg == '随机') {
                const arr = new Array(4).fill(limit[1]);
                while (pts > 0) {
                    const sub = Math.round(Math.random() * (Math.min(pts, limit[1]) - 1)) + 1;
                    while (true) {
                        const select = Math.floor(Math.random() * 4) % 4;
                        if (arr[select] - sub < 0) continue;
                        arr[select] -= sub;
                        pts -= sub;
                        break;
                    }
                }
                selectStatsRet = {
                    CHR: limit[1] - arr[0],                     // 颜值 charm CHR
                    INT: limit[1] - arr[1],                     // 智力 intelligence INT
                    STR: limit[1] - arr[2],                     // 体质 strength STR
                    MNY: limit[1] - arr[3],                     // 家境 money MNY
                }
            } else if (/(\d\s+){3}\d/.test(msg)) {
                const arr = []
                let sum = 0
                for (let i of msg.split(/\s+/)) {
                    i = Number(i)
                    if (i < limit[0] || i > limit[1]) {
                        cache[user_id].timer = setTimer(e, 120)
                        return await e.reply(`每个属性不能超过${limit[1]}和小于${limit[0]}，请重新发送`)
                    }
                    sum += i
                    arr.push(i)
                }
                if (sum != cache[user_id].pts) {
                    cache[user_id].timer = setTimer(e, 120)
                    return await e.reply(`属性之和需为${cache[user_id].pts}，请重新发送`)
                }
                selectStatsRet = {
                    CHR: arr[0],                     // 颜值 charm CHR
                    INT: arr[1],                     // 智力 intelligence INT
                    STR: arr[2],                     // 体质 strength STR
                    MNY: arr[3],                     // 家境 money MNY
                }
            }
            await e.reply('你的人生正在重开...请稍后')
            const selectTLTRet = cache[user_id].selectTLTRet
            core.start(selectStatsRet);
            let trajectory;
            const event = [
                [
                    `---------------初始天赋---------------`,
                    selectTLTRet.map(({ name, description }) => `【${name}】: ${description}`).join('\n')
                ].join('\n'),
                [
                    `---------------初始属性---------------`,
                    `颜值: ${selectStatsRet.CHR} 智力: ${selectStatsRet.INT} 体质: ${selectStatsRet.STR} 家境: ${selectStatsRet.MNY}`
                ].join('\n')
            ]
            let ent = []
            do {
                try {
                    trajectory = core.next();
                } catch (e) {
                    console.error(e);
                    throw e;
                }
                const { age, content, achievements } = trajectory;
                const stats = core.propertys
                ent.push([
                    `--------------------------------------`,
                    `\n颜值:${stats.CHR} 智力:${stats.INT} 体质:${stats.STR} 家境:${stats.MNY} 快乐:${stats.SPR}`,
                    `\n-- ${age} 岁\n   `,
                    content.map(
                        ({ type, description, rate, name, postEvent }) => {
                            switch (type) {
                                case 'TLT':
                                    return `天赋【${name}】发动：${description}`;
                                case 'EVT':
                                    return description + (postEvent ? `\n    ${postEvent}` : '');
                            }
                        }
                    ).join('\n    '),
                    achievements.length ? '\n' : '',
                    achievements.map(({ name, description }) => {
                        return `获得成就【${name}】:\n    ${description}`
                    }).join('\n')].join('')
                );
                if (ent.length == 5) {
                    event.push(ent.join('\n'))
                    ent = []
                }
            } while (!trajectory.isEnd)
            if (ent.length) {
                event.push(ent.join('\n'))
            }
            const statsList = [
                { text: '颜值', key: 'HCHR' },
                { text: '智力', key: 'HINT' },
                { text: '体质', key: 'HSTR' },
                { text: '家境', key: 'HMNY' },
                { text: '快乐', key: 'HSPR' },
                { text: '享年', key: 'HAGE' },
                { text: '总评', key: 'SUM' }
            ]
            const summary = core.summary
            const end = [
                '-----------------总结-----------------'
            ]
            for (const { text, key } of statsList) {
                end.push(`${text}: ${summary[key].value} ${summary[key].judge}`);
            }
            event.push(end.join('\n'))
            await e.reply(await common.makeForwardMsg(e, event))
            await saveItem(user_id)
            delete cache[user_id]
            return true
        }
        return false
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

function setTimer(e, time = 120) {
    const user_id = getUserId(e)
    return setTimeout(() => {
        delete cache[user_id]
        return e.reply('人生重开已取消')
    }, time * 1000)
}
