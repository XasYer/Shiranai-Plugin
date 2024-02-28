const GameState = Object.freeze({
    PREPARE: 0,
    GAMING: 1,
    WIN: 2,
    FAIL: 3
});

const OpenResult = Object.freeze({
    OUT: 0,
    DUP: 1,
    WIN: 2,
    FAIL: 3
});

const MarkResult = Object.freeze({
    OUT: 0,
    OPENED: 1,
    WIN: 2
});

class Tile {
    constructor() {
        this.isMine = false;
        this.isOpen = false;
        this.marked = false;
        this.boom = false;
        this.count = 0;
    }
}

export default class MineSweeper {
    constructor(row, column, mineNum) {
        this.row = row;
        this.column = column;
        this.mineNum = mineNum;
        this.startTime = Date.now();
        this.state = GameState.PREPARE;
        this.tiles = Array.from({ length: row }, () => Array.from({ length: column }, () => new Tile()));
        this.scale = 4;
    }
    setMines() {
        let count = 0;
        while (count < this.mineNum) {
            const i = Math.floor(Math.random() * this.row);
            const j = Math.floor(Math.random() * this.column);
            const tile = this.tiles[i][j];
            if (tile.isMine || tile.isOpen) {
                continue;
            }
            tile.isMine = true;
            count++;
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                this.tiles[i][j].count = this.countAround(i, j);
            }
        }
        this.state = GameState.GAMING;
    }

    countAround(x, y) {
        let count = 0;
        for (const [dx, dy] of MineSweeper.neighbors()) {
            if (this.isValid(x + dx, y + dy) && this.tiles[x + dx][y + dy].isMine) {
                count++;
            }
        }
        return count;
    }

    isValid(x, y) {
        return x >= 0 && x < this.row && y >= 0 && y < this.column;
    }

    static neighbors() {
        return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    }

    open(x, y) {
        if (!this.isValid(x, y)) {
            return OpenResult.OUT;
        }

        const tile = this.tiles[x][y];
        if (tile.isOpen) {
            return OpenResult.DUP;
        }

        tile.isOpen = true;
        if (this.state === GameState.PREPARE) {
            this.setMines();
        }

        if (tile.isMine) {
            this.state = GameState.FAIL;
            tile.boom = true;
            this.showMines();
            return OpenResult.FAIL;
        }

        if (tile.count === 0) {
            this.spreadAround(x, y);
        }

        const openNum = this.tiles.flat().filter(t => t.isOpen).length;
        if (openNum + this.mineNum >= this.row * this.column) {
            this.state = GameState.WIN;
            this.showMines();
            return OpenResult.WIN;
        }
    }

    mark(x, y) {
        if (!this.isValid(x, y)) {
            return MarkResult.OUT;
        }

        const tile = this.tiles[x][y];
        if (tile.isOpen) {
            return MarkResult.OPENED;
        }

        tile.marked = !tile.marked;

        const markedTiles = this.tiles.flat().filter(t => t.marked);
        if (markedTiles.length === this.mineNum && markedTiles.every(t => t.isMine)) {
            this.state = GameState.WIN;
            this.showMines();
            return MarkResult.WIN;
        }
    }

    showMines() {
        for (const row of this.tiles) {
            for (const tile of row) {
                if (tile.isMine) {
                    if (!tile.marked) {
                        tile.isOpen = true;
                    }
                } else {
                    if (tile.marked) {
                        tile.isOpen = true;
                    }
                }
            }
        }
    }

    spreadAround(x, y) {
        for (const [dx, dy] of MineSweeper.neighbors()) {
            const nx = x + dx;
            const ny = y + dy;

            if (!this.isValid(nx, ny)) {
                continue;
            }

            const tile = this.tiles[nx][ny];
            if (!tile.isMine && !tile.isOpen) {
                tile.isOpen = true;
                tile.marked = false;

                if (tile.count === 0) {
                    this.spreadAround(nx, ny);
                }
            }
        }
    }
}