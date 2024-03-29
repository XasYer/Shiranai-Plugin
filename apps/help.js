import { toButton } from "../models/common.js"
export class ShiranaiHelp extends plugin {
    constructor() {
        super({
            name: 'Shiranai帮助',
            dsc: '希腊奶',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: '^#?(Shiranai|希腊奶|小游戏)(帮助|菜单|help)$',
                    fnc: 'help'
                }
            ]
        })
    }
    async help (e) {
        if (e.bot.adapter.name != 'QQBot' && e.adapter != 'QQBot') {
            return false
        }
        e.toQQBotMD = true
        const buttons = [
            [
                { text: '连连看', callback: '#连连看' },
                { text: '数字游戏', callback: '#数字游戏' },
                { text: '消灭星星', callback: '#消灭星星' },
                { text: '井字棋', callback: '#井字棋' },
            ],
            [
                { text: '金币大作战', callback: '#金币大作战' },
                { text: '重生模拟器', callback: '#remake' },
            ]
        ]
        return this.reply(['\r#小游戏帮助', toButton(buttons)])
    }
}
