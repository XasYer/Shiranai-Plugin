import { Symbols } from "./Symbols.js";
import { randomUUID } from 'node:crypto'

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
                const RandomSymbolsKey = SymbolsKeys[random];
                result.push(Symbols[key][RandomSymbolsKey])
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
 * @param {Array} Symbols 
 * @returns 
 */
function randomChessPosition(Symbols) {
    const maxX = 4
    const maxY = 5
    const maxSize = maxX * maxY
    const arr = Array.from({ length: Symbols.length }, (v, i) => i)
    const positions = Array.from({ length: maxSize }, (v, i) => i + 1)
    const result = {};
    for (let i = 0; i < (arr.length > maxSize) ? maxSize : arr.length; i++) {
        const randomIndexPos = Math.floor(Math.random() * positions.length)
        const randomIndexPiece = Math.floor(Math.random() * arr.length)
        const randomIndexArr = arr[randomIndexPiece]
        const pos = positions[randomIndexPos]
        const x = Math.floor((pos - 1) / maxY) + 1
        const y = (pos - 1) % maxY + 1
        Symbols[randomIndexArr].x = x
        Symbols[randomIndexArr].y = y
        Symbols[randomIndexArr].times = 0
        Symbols[randomIndexArr].coin = 0
        result[`${x},${y}`] = Symbols[randomIndexArr]
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
 * 根据x和y返回所有相邻的格子
 * @param {number} x x轴
 * @param {number} y y轴
 * @returns 
 */
function getAdjacentPositions(x, y) {
    const maxX = 4
    const maxY = 5
    let positions = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue
            let AdjacentX = x + i
            let AdjacentY = y + j
            if (AdjacentX >= 1 && AdjacentX <= maxX && AdjacentY >= 1 && AdjacentY <= maxY) {
                positions.push(`${AdjacentX},${AdjacentY}`)
            }
        }
    }
    return positions
}

// 调用函数并打印结果
// console.log(getAdjacentPositions(5, 3));

const AllSymbols = [{
    rand: randomUUID(),
    id: 'Anchor',
    name: '锚',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '位于角落时给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)',
    handle: function (SlotMachine, Info) {
        console.log(Info.self.name, Info.self.x, Info.self.y);
        if ((Info.self.x == 1 || Info.self.x == 4) && (Info.self.y == 1 || Info.self.y == 5)) {
            SlotMachine[`${Info.self.x},${Info.self.y}`].payout = 4
            Info.event.push('锚位于角落获得硬币x4')
            console.log('锚位于角落获得硬币x4');
        }
        return Info
    }
}, {
    rand: randomUUID(),
    id: 'Anchor',
    name: '锚',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '位于角落时给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)',
    handle: function (SlotMachine, Info) {
        console.log(Info.self.name, Info.self.x, Info.self.y);
        if ((Info.self.x == 1 || Info.self.x == 4) && (Info.self.y == 1 || Info.self.y == 5)) {
            SlotMachine[`${Info.self.x},${Info.self.y}`].payout = 4
            Info.event.push('锚位于角落获得硬币x4')
            console.log('锚位于角落获得硬币x4');
        }
        return Info
    }
}, {
    id: 'Diamond',
    name: '钻石',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 5,
    description: '为<emphasis>每位</emphasis>[钻石](Symbols/VeryRare/Diamond)给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)',
    handle: (SlotMachine, Info) => {
        console.log(Info.self.name, Info.self.x, Info.self.y);
        return Info
    }
}]
const Chess = randomChessPosition(AllSymbols)
// for (const key in Chess) {
//     Chess[key].Adjacent = getAdjacentPositions(Chess[key].x, Chess[key].y)
// }
let Info = {
    allSymbols: AllSymbols,
    // 所有物品
    allItems: [],
    // 所有精华
    allEssences: [],
    // 自身信息
    self: {},
    // 本次获得的硬币
    payout: 0,
    // 交房租次数
    timesRentPaid: 0,
    // 旋转次数
    spins: 0,
    // 本次旋转所发生的事件
    event: [],
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
    callback: []
}
// 第一次循环处理事件
for (const key in Chess) {
    Info.self = Chess[key]
    Chess[key].handle(Chess, Info)
}
// console.log('Chess', Chess);
// console.log('Chess', Chess);
let payout = 0
// 第二次循环计算硬币
for (const key in Chess) {
    payout += Chess[key].payout
}
console.log('获得硬币:', payout);
// 方法抽离出来,根据id命名,写到一个js中 √
// 其他参数写入文件 比如count等等需要自定义的参数 
// 将符号放入棋盘的方法需要重做,不要新建对象,会导致不是引用关系,这样直接修改棋盘上的棋子不会影响原棋子 √
// 不要直接修改payout √

const handle = {
    SlotMachine: {
        '1,1': {

        }
    },
    Info: {
        // 所有符号
        // 不能用Object 会有相同的符号  相同的符号会有不同的payout 
        // 再给一个唯一的值 rand?? 通过rand判断 
        // [{rand: 1,id:'Anchor},{rand: 2,id:'Anchor}]
        // 是不是还需要一个棋盘上的所有棋子,还是说就是SlotMachine
        // 比如钻石是为棋盘上所有钻石+1硬币
        allSymbols: [
            {
                rand: 'randomUUid',
                id: 'Anchor',
                name: '锚',
                rarity: 'Common',
                type: 'Symbols',
                payout: 1,
                description: '位于角落时给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)',
            },
            {
                rand: 'Date.now',
                id: 'Banana',
                name: '香蕉',
                rarity: 'Common',
                type: 'Symbols',
                payout: 1,
                description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[香蕉皮](Symbols/Common/Banana_Peel)'
            },
        ],
        // 所有物品
        allItems: [],
        // 所有精华
        allEssences: [],
        // 自身信息
        self: {
            id: 'Banana',
            name: '香蕉',
            rarity: 'Common',
            type: 'Symbols',
            payout: 1,
            description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[香蕉皮](Symbols/Common/Banana_Peel)',
            x: 5,
            y: 4,
            adjacent: ['4,3', '4,4', '5,3']
        },
        // 本次获得的硬币
        payout: 0,
        // 交房租次数
        timesRentPaid: 0,
        // 旋转次数
        spins: 0,
        // 本次旋转所发生的事件
        event: ['锚位于角落获得金币x4'],
        // 本次被移除的符号
        removeSymbols: [{ 'Anchor': 'rand' }],
        // 本次被移除的物品
        removeItems: [{ 'Anchor': 'rand' }],
        // 本次被移除的精华
        removeEssences: [{ 'Anchor': 'rand' }],
        // 本次被添加的符号
        addSymbols: [{ 'id': 'Anchor', 'rand': 'rand' }],
        // 本次被添加的物品
        addItems: [{ 'Anchor': 'rand' }],
        // 本次被添加的精华
        addEssences: [{ 'Anchor': 'rand' }],
        // 回调函数,旋转完后调用
        callback: [(SlotMachine, Info) => Info]
    }
}

// 替换字符
// const replace = {
//     '<text2>(.*?)</text2>': '<font color="red">$1</font>',
//     '\\[(.*?)\\]\\((.*?)\\)': '<img url="$2.webp" title="$1"/>'
// }
// let text = Dwarf.description

// for (const key in replace) {
//     const reg = new RegExp(key, 'g')
//     text = text.replace(reg, replace[key])
// }
// console.log('text', text);



// let i = 1
// while (true) {
//     const random = Math.floor(Math.random() * 43)
//     console.log('random', random);
//     if (random == 42) {
//         console.log('次数:', i);
//         break
//     }
//     i++
// }

// let keys = Object.keys(Symbols.Common);
// let randomKey = keys[Math.floor(Math.random() * keys.length)];
// let randomValue = Symbols.Common[randomKey];
// console.log('randomValue', randomValue);