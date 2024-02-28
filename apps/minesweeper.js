import MineSweeper from '../models/boardgame/minesweeper.js'
import { toButton } from '../models/common.js'

// 多少行
const row = 5
// 每行多少个
const column = 10
// 雷数量
const mineNum = 10

const MineGame = {}
export class exp extends plugin {
    constructor() {
        super({
            name: '轻量版扫雷',
            dsc: '轻量版扫雷',
            event: 'message',
            priority: 2,
            rule: [
                {
                    reg: /^#扫雷\d*$/,
                    fnc: 'mine'
                },
                {
                    reg: /^((\s*标记\s*)?挖开 \d+,\d+\s*(标记\s*)?)+$/,
                    fnc: 'open'
                }
            ]
        })
    }

    async mine(e) {
        if (e.bot.adapter.name != 'QQBot' && e.adapter != 'QQBot') {
            return false
        }
        let game = MineGame[e.group_id]
        if (game) {
            return true
        }
        let num = e.msg.replace('#扫雷', '') || mineNum
        num = Number(num)
        if (num < 0 || num > 50) {
            num = mineNum
        }
        MineGame[e.group_id] = new MineSweeper(row, column, num);
        MineGame[e.group_id].setMines();
        const buttons = []
        let x = 1
        for (const i of MineGame[e.group_id].tiles) {
            const button = []
            let y = 1
            for (const k of i) {
                button.push({ text: ' ', input: `挖开 ${x},${y}` })
                y++
            }
            x++
            buttons.push(button)
        }
        return await e.reply([`点击格子扫雷,可多选`, toButton(buttons)])
    }

    async open(e) {
        if (e.bot.adapter.name != 'QQBot' && e.adapter != 'QQBot') {
            return false
        }
        let game = MineGame[e.group_id]
        if (!game) {
            return e.reply(['扫雷未开始', toButton([[{ text: '开始游戏', callback: '/扫雷' }]])])
        }
        const reg = /挖开 \d+,\d+\s*/g
        const mark = e.msg.includes('标记')
        let log = ''
        const target = e.msg.match(reg).map(i => {
            const msg = i.replace('挖开 ', '').trim()
            const [x, y] = msg.split(',')
            if (log) log += ` `
            log += `${x},${y}`
            return { x: Number(x), y: Number(y) }
        })
        let content = `点击按钮扫雷,可多选\r[点击切换标记模式或者在文字最后加上标记] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('标记')}&reply=false&enter=false)\r你的选择为: ${log}`
        let state = 0, mine
        for (const { x, y } of target) {
            const ret = game[mark ? 'mark' : 'open'](x - 1, y - 1)
            if (ret == 2 || ret == 3) {
                state = ret
                mine = x + `,` + y
                break
            }
        }
        const buttons = []
        let x = 1
        content = {
            3: `你输了 ${mine}是雷  [再来一局] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/扫雷')}&reply=false&enter=true)`,
            2: `你赢了!!  [再来一局] (mqqapi://aio/inlinecmd?command=${encodeURIComponent('/扫雷')}&reply=false&enter=true)`,
        }[state] || content
        for (const i of game.tiles) {
            const button = []
            let y = 1
            for (const k of i) {
                if (state == 3 || state == 2) {
                    if (k.isMine) {
                        button.push({ text: '雷', input: `挖开 ${x},${y}`, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
                    } else if (k.isOpen) {
                        button.push({ text: k.count + '', input: `挖开 ${x},${y}`, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
                    } else {
                        button.push({ text: ' ', input: `挖开 ${x},${y}`, permission: 'xxx' })
                    }
                } else {
                    if (k.isOpen) {
                        button.push({ text: k.count + '', input: `挖开 ${x},${y}`, permission: 'xxx', QQBot: { render_data: { style: 0 } } })
                    } else if (k.marked) {
                        button.push({ text: '★', input: `挖开 ${x},${y}` })
                    } else {
                        button.push({ text: ' ', input: `挖开 ${x},${y}` })
                    }
                }
                y++
            }
            x++
            buttons.push(button)
        }
        if (state == 3 || state == 2) {
            MineGame[e.group_id] = null
        }
        return await e.reply([content, toButton(buttons)])
    }
}