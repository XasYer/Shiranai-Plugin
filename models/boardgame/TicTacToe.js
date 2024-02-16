import { toButton } from "../common.js"

export default class TicTacToe {
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
        return toButton(buttons)
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