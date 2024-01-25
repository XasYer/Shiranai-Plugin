import Symbols from "./Symbols.js"
import { randomUUID } from 'node:crypto'
import { join } from "node:path"
import fs from 'node:fs'
import _ from 'lodash';

const maxX = 4
const maxY = 5
/**
 * 根据x和y返回所有相邻的格子
 * @param {number} x x轴
 * @param {number} y y轴
 * @returns 
 */
function getAdjacentPositions(x, y) {
    let positions = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue
            const adjacentX = x + i
            const adjacentY = y + j
            if (adjacentX >= 1 && adjacentX <= maxX && adjacentY >= 1 && adjacentY <= maxY) {
                positions.push(`${adjacentX},${adjacentY}`)
            }
        }
    }
    return positions
}

/**
 * 根据x和y返回所有八个方向的格子
 * @param {number} x 
 * @param {number} y 
 */
function getDiagonalPositions(x, y) {
    const positions = {
        rightUpper: [],
        right: [],
        rightLower: [],
        down: [],
        leftLower: [],
        left: [],
        leftUpper: [],
        up: [],
    }

    for (let i = 1; i <= Math.max(maxX, maxY); i++) {
        if (x - i > 0 && y + i <= maxY) {
            positions.rightUpper.push([x - i, y + i])
        }
        if (x + i <= maxX && y + i <= maxY) {
            positions.rightLower.push([x + i, y + i])
        }
        if (x - i > 0 && y - i > 0) {
            positions.leftUpper.push([x - i, y - i])
        }
        if (x + i <= maxX && y - i > 0) {
            positions.leftLower.push([x + i, y - i])
        }
        if (x + i <= maxX) {
            positions.down.push([x + i, y])
        }
        if (x - i > 0) {
            positions.up.push([x - i, y])
        }
        if (y + i <= maxY) {
            positions.right.push([x, y + i])
        }
        if (y - i > 0) {
            positions.left.push([x, y - i])
        }
    }
    return positions
}

/**
 * 返回同一行的格子,不包含自己
 * @param {*} x 
 * @param {*} y 
 */
function getLinePositions(x, y) {
    const positions = []
    for (let i = 1; i <= Math.max(maxX, maxY); i++) {
        if (i != y) {
            positions.push(`${x},${i}`)
        }
    }
    return positions
}

/**
 * 返回同一列的格子,不包含自己
 * @param {*} x 
 * @param {*} y 
 */
function getColumnPositions(x, y) {
    const positions = []
    for (let i = 1; i <= Math.min(maxX, maxY); i++) {
        if (i != x) {
            positions.push(`${i},${y}`)
        }
    }
    return positions
}

/**
 * 获得旋转完需要选择的三个符号
 * @param {number} TimesRentPaid 交房租的次数
 * @returns 
 */
function getChoiceSymbols(TimesRentPaid) {
    let TheBaseChances
    switch (TimesRentPaid) {
        case 0:
            TheBaseChances = {
                Common: 100,
                Uncommon: 0,
                Rare: 0,
                VaryRare: 0
            }
            break
        case 1:
            TheBaseChances = {
                Common: 90,
                Uncommon: 10,
                Rare: 0,
                VaryRare: 0
            }
            break
        case 2:
            TheBaseChances = {
                Common: 79,
                Uncommon: 20,
                Rare: 1,
                VaryRare: 0
            }
            break
        case 3:
            TheBaseChances = {
                Common: 74,
                Uncommon: 25,
                Rare: 1,
                VaryRare: 0
            }
            break
        case 4:
            TheBaseChances = {
                Common: 69,
                Uncommon: 29,
                Rare: 1.5,
                VaryRare: 0.5
            }
            break
        default:
            TheBaseChances = {
                Common: 68,
                Uncommon: 30,
                Rare: 1.5,
                VaryRare: 0.5
            }
    }
    const cache = {}
    const result = []
    for (let i = 0; i < 3; i++) {
        let rand = Math.random() * 100;
        for (let key in TheBaseChances) {
            rand -= TheBaseChances[key];
            if (rand < 0) {
                const SymbolsKeys = Object.keys(Symbols[key]);
                let random
                while (true) {
                    random = Math.floor(Math.random() * SymbolsKeys.length)
                    if (!cache[`${key}:${random}`]) {
                        cache[`${key}:${random}`] = true
                        break
                    }
                }
                const RandomSymbolsKey = SymbolsKeys[random]
                const Symbol = Symbols[key][RandomSymbolsKey]
                // 统一格式
                result.push(`${Symbol.rarity}/${Symbol.id}`)
                break
            }
        }
    }
    return result
}

/**
 * 获得下一次交房租所需要的次数以及租金
 * @param {number} TimesRentPaid 交房租的次数
 * @param {number} floor 楼层
 */
function getNextRentPaidInfo(TimesRentPaid, floor = 1) {
    let nextRentPaid, rentPaidCoin
    const spins = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 10]
    let Floor
    switch (floor) {
        case 1:
            Floor = [25, 50, 100, 150, 225, 300, 350, 425, 575, 625, 675, 777, 1000]
            break;
        case 2:
            Floor = [25, 50, 100, 150, 225, 300, 375, 425, 575, 625, 675, 777, 1000]
            break
        case 3:
        case 4:
        case 5:
            Floor = [25, 50, 100, 150, 225, 300, 375, 450, 575, 625, 675, 777, 1000]
            break
        case 6:
        case 7:
            Floor = [25, 50, 100, 150, 225, 300, 375, 450, 575, 650, 675, 777, 1000]
            break
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            Floor = [25, 50, 100, 150, 225, 300, 375, 450, 575, 650, 700, 777, 1000]
            break
        default:
            Floor = [25, 50, 100, 150, 225, 300, 375, 450, 600, 650, 700, 777, 1000]
            break;
    }
    nextRentPaid = spins[TimesRentPaid] || 10
    rentPaidCoin = Floor[TimesRentPaid] || (TimesRentPaid - 13) * 500 + 1000
    return {
        nextRentPaid,
        rentPaidCoin
    }
}

/**
 * 将所有符号随机放置到棋盘上
 * @param {Array} SymbolsList 
 * @returns 
 */
function randomSlotMachinePosition(SymbolsList) {
    const maxX = 4
    const maxY = 5
    const maxSize = maxX * maxY
    const arr = Array.from({ length: SymbolsList.length }, (v, i) => i)
    const positions = Array.from({ length: maxSize }, (v, i) => i + 1)
    const result = {};
    for (let i = 0; i < 20; i++) {
        const randomIndexPos = Math.floor(Math.random() * positions.length)
        const randomIndexPiece = Math.floor(Math.random() * arr.length)
        const randomIndexArr = arr[randomIndexPiece]
        const pos = positions[randomIndexPos]
        const x = Math.floor((pos - 1) / maxY) + 1
        const y = (pos - 1) % maxY + 1
        if (SymbolsList[randomIndexArr]) {
            result[`${x},${y}`] = SymbolsList[randomIndexArr]
        } else {
            result[`${x},${y}`] = JSON.parse(JSON.stringify(Symbols.Special.Empty))
        }
        result[`${x},${y}`].x = x
        result[`${x},${y}`].y = y
        result[`${x},${y}`].times = 0
        result[`${x},${y}`].coin = 0
        positions.splice(randomIndexPos, 1)
        arr.splice(randomIndexPiece, 1)
    }
    const sortedResult = {}
    Object.keys(result).sort((a, b) => {
        const [ax, ay] = a.split(',').map(Number)
        const [bx, by] = b.split(',').map(Number)
        return ay - by || ax - bx
    }).forEach(key => {
        sortedResult[key] = result[key]
    })
    return sortedResult
}

/**
 * 添加符号到所有符号中
 * @param {Array<string>} addSymbols 
 * @param {Array<object>} allSymbols 
 */
function addSymbolToAllSymbols(addSymbols, allSymbols) {
    while (true) {
        const i = addSymbols.shift()
        if (!i) {
            break
        }
        const [rarity, id] = i.split('/')
        const Symbol = Symbols[rarity][id]
        Symbol.rand = randomUUID()
        allSymbols.push(Symbol)
    }
}

/**
 * 保存或获取存档
 * @param {any} user_id 
 * @param {Object} event 
 * @param {'get'|'set'|'del'} type 默认get
 */
function getOrSetEvent(user_id, event, type = 'get') {
    let path = process.cwd()
    for (const i of ['plugins', 'Luck be a Landlord', 'data', user_id]) {
        path = join(path, String(i))
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    }
    path = join(path, 'event.json')
    if (event) {
        if (type === 'del') {
            if (fs.existsSync(path)) fs.unlinkSync(path)
        } else {
            fs.writeFileSync(path, JSON.stringify(event), 'utf-8')
        }
        return true
    } else if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf-8'))
    } else {
        if (type == 'set') {
            return {
                // 所有符号
                allSymbols: [],
                // 所有物品
                allItems: [],
                // 所有精华
                allEssences: [],
                // 楼层
                floor: 1,
                // 拥有的硬币
                coins: 1,
                // 交房租次数
                timesRentPaid: 0,
                // 下一次交房租剩余的旋转
                nextRentPaid: 5,
                // 下一次交房租所需的硬币
                rentPaidCoin: 25,
                // 旋转次数
                spins: 0,
                // 本次旋转所发生的事件
                log: [],
                // 本次被移除的符号
                removeSymbols: [],
                // 本次被移除的物品
                removeItems: [],
                // 本次被移除的精华
                removeEssences: [],
                // 本次被添加的符号
                addSymbols: [],
                // 本次被添加的物品
                addItems: [],
                // 本次被添加的精华
                addEssences: [],
                // 回调函数,旋转完后调用
                callback: [],
                // 旋转完成后需要选择的符号
                choiceSymbols: ['Common/Coin', 'Common/Cherry', 'Common/Pearl', 'Common/Flower', 'Common/Cat']
            }
        }
        return false
    }
}

const pluResPath = join(process.cwd(), 'plugins', 'Luck be a Landlord', 'resources')
const replace = {
    '<emphasis>(.*?)</emphasis>': '<span style="color: #E14A68;">$1</span>',
    '\\[(.*?)\\]\\((.*?)\\)': `[$1]<img src="${pluResPath}/$2.webp" class="thumb"/>`,
    '<payout>(.*?)</payout>': '<span style="color:#F8F87B;">$1</span>',
    '<Uncommon>(.*?)</Uncommon>': '<span class="Uncommon">$1</span>',
    '<Common>(.*?)</Common>': '<span class="Common">$1</span>',
    '<Rare>(.*?)</Rare>': '<span class="Rare">$1</span>',
    '<VeryRare>(.*?)</VeryRare>': '<span class="VeryRare">$1</span>',
}
const rarityType = {
    'Common': '普通',
    'Uncommon': '非凡',
    'Rare': '稀有',
    'VeryRare': '非常稀有'
}

/**
 * 转换成可渲染的符号
 * @param {*} Symbol 
 * @returns 
 */
function toRenderSymbol(Symbol) {
    Symbol = _.cloneDeep(Symbol)
    let text = Symbol.description
    for (const key in replace) {
        const reg = new RegExp(key, 'g')
        text = text.replace(reg, replace[key])
    }
    Symbol.description = text
    Symbol.rarityName = rarityType[Symbol.rarity]
    return Symbol
}

export {
    getAdjacentPositions,
    getDiagonalPositions,
    getLinePositions,
    getColumnPositions,
    getChoiceSymbols,
    getNextRentPaidInfo,
    getOrSetEvent,
    randomSlotMachinePosition,
    addSymbolToAllSymbols,
    toRenderSymbol
}