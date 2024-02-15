class TicTacToe {
    constructor(user_id) {
        this.board = Array(9).fill({ isEmpty: true, player: ' ' });
        this.nextPlayer = {
            show: 'X',
            user_id
        }
        this.playerX = user_id
        this.playerO = null
        this.state = {
            validMove: true,
            isWin: false,
            isDraw: false,
            player: 'X'
        }
    }

    toButton(add) {
        const buttons = []
        const button = []
        let len = 0
        for (const i of this.board) {
            len++
            let item = {
                text: i.player,
                callback: `/井字棋下 ${len}`
            }
            if (i.isEmpty) {
                item.permission = this.nextPlayer.user_id
            } else {
                item.permission = 'xxx'
                item.QQBot = {
                    render_data: {
                        style: 0
                    }
                }
            }
            button.push(item)
            if (len % 3 == 0) {
                buttons.push([...button])
                button.length = 0
            }
        }
        if (add) {
            buttons.push(add)
        }
        return segment.button(...buttons)
    }

    // 下棋
    move(position) {
        const player = this.nextPlayer.show
        position = +position
        if (this.board[position - 1].isEmpty) {
            this.board[position - 1] = { player, isEmpty: false };
            const isWin = this.checkWin(player);
            const isDraw = this.checkDraw();
            this.nextPlayer = player == 'X' ? {
                show: 'O',
                user_id: this.playerO
            } : {
                show: 'X',
                user_id: this.playerX
            }
            this.state = { validMove: true, isWin, isDraw, player }; // 下棋成功
            const emptyIndexes = this.board.reduce((indexes, cell, index) => {
                if (cell.isEmpty) {
                    indexes.push(index);
                }
                return indexes;
            }, []);
            if (emptyIndexes.length == 1) {
                return this.move(emptyIndexes[0] + 1)
            }
        } else {
            this.state = { validMove: false, isWin: false, isDraw: false, player }; // 下棋失败
        }
        return this.state
    }

    // 判断是否有玩家获胜
    checkWin(player) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (this.board[a].player === player && this.board[b].player === player && this.board[c].player === player) {
                return true; // 有玩家获胜
            }
        }
        return false; // 没有玩家获胜
    }

    // 判断是否为平局
    checkDraw() {
        return this.board.every(cell => !cell.isEmpty);
    }
}

const GAME = {}

export class exp extends plugin {
    constructor() {
        super({
            name: '轻量版井字棋',
            dsc: '轻量版井字棋',
            event: 'message',
            priority: 1,
            rule: [
                {
                    reg: /^#井字棋$/,
                    fnc: 'start'
                },
                {
                    reg: /^[#\/]?井字棋下\s*\d$/,
                    fnc: 'ticTacToe'
                }
            ]
        })
    }

    async start(e) {
        if (e.bot.adapter.name != 'QQBot') {
            return false
        }
        e.toQQBotMD = true
        if (GAME[e.group_id]) {
            const game = GAME[e.group_id]
            if (game.start) {
                return e.reply(['井字棋已开始,请等待结束'])
            } else if (game.playerX == e.user_id) {
                return e.reply(['不能和自己下棋'])
            } else {
                clearTimeout(game.timer)
                game.timer = setTimer(e)
                game.playerO = e.user_id
                return e.reply([
                    segment.at(e.user_id),
                    '加入了游戏\r请',
                    segment.at(game.playerX),
                    '选择',
                    game.toButton()
                ])
            }
        }
        GAME[e.group_id] = new TicTacToe(e.user_id)
        const game = GAME[e.group_id]
        game.timer = setTimer(e)
        game.playerX = e.user_id
        return e.reply([
            segment.at(e.user_id),
            '发起了井字棋\r',
            '可发送/井字棋 加入对局',
            segment.button([{ text: '接收挑战', callback: '/井字棋' }])
        ])
    }

    async ticTacToe(e) {
        if (e.bot.adapter.name != 'QQBot') {
            return false
        }
        e.toQQBotMD = true
        if (!GAME[e.group_id]) {
            return e.reply(['井字棋未开始', segment.button([{ text: '井字棋', callback: '/井字棋' }])])
        }
        const game = GAME[e.group_id]
        clearTimeout(game.timer)
        if (game.nextPlayer.user_id != e.user_id) {
            return e.reply([segment.at(e.user_id), '现在不是你的回合'])
        }
        const result = game.move(e.msg.replace(/[#\/]?井字棋下\s*/, ''))
        if (!result.validMove) {
            game.timer = setTimer(e)
            return e.reply([segment.at(e.user_id), '坐标有误,请重新发送', game.toButton()])
        }
        if (result.isWin) {
            delete GAME[e.group_id]
            return e.reply(['恭喜', segment.at(e.user_id), '获得胜利!', game.toButton([{ text: '井字棋', callback: '/井字棋' }])])
        }
        if (result.isDraw) {
            delete GAME[e.group_id]
            return e.reply(['本次平局!', game.toButton([{ text: '井字棋', callback: '/井字棋' }])])
        }
        game.timer = setTimer(e)
        return e.reply([
            '请',
            segment.at(game.nextPlayer.user_id),
            '选择',
            game.toButton()
        ])
    }
}

function setTimer(e) {
    return setTimeout(() => {
        e.reply(['井字棋已超时自动结束', segment.button([{ text: '井字棋', callback: '/井字棋' }])])
        delete GAME[e.group_id]
    }, 60 * 3 * 1000)
}