import { getAdjacentPositions, getDiagonalPositions, getLinePositions } from './utils.js'

/**
 * @typedef {Object} self
 * @property {string} rand 随机值,唯一
 * @property {string} id 英文名
 * @property {string} name 中文名
 * @property {'Common'|'Uncommon'|'Rare'|'VeryRare'} rarity 稀有度
 * @property {'Symbols'|'Items'|'Essences'} type 类型
 * @property {number} payout 基础硬币
 * @property {number} coin 本次获得的硬币
 * @property {number} times 本次获得的硬币倍数
 * @property {string} description 描述
 * @property {number} x 所在的x轴
 * @property {number} y 所在的y轴
 * @property {string} position 所在位置
 * @property {number|undefined} count 计数
 */

/**
 * @typedef {Object} Symbol
 * @property {string} rand 随机值,唯一
 * @property {string} id 英文名
 * @property {string} name 中文名
 * @property {'Common'|'Uncommon'|'Rare'|'VeryRare'} rarity 稀有度
 * @property {'Symbols'|'Items'|'Essences'} type 类型
 * @property {number} payout 能获得多少硬币
 * @property {string} description 描述
 */

/**
 * @typedef {Object} event
 * @property {Array<Symbol>} allSymbols 所有符号
 * @property {Array} allItems 所有物品
 * @property {Array} allEssences 所有精华
 * @property {number} payout 本次获得的硬币
 * @property {number} timesRentPaid 交房租次数
 * @property {number} spins 旋转次数
 * @property {Array.<string>} log 本次旋转所发生的事件
 * @property {Array.<Symbol>} removeSymbols 本次被移除的符号
 * @property {Array.<rmOrAdd>} removeItems 本次被移除的物品
 * @property {Array.<rmOrAdd>} removeEssences 本次被移除的精华
 * @property {Array.<string>} addSymbols 本次被添加的符号
 * @property {Array.<rmOrAdd>} addItems 本次被添加的物品
 * @property {Array.<rmOrAdd>} addEssences 本次被添加的精华
 * @property {Array.<Function>} callback 回调函数,旋转完后调用
 */

const Symbols = {
  /** @param {event} event @param {self} self */
  Anchor: function (SlotMachine, event, self) {
    if ((self.x == 1 || self.x == 4) && (self.y == 1 || self.y == 5)) {
      self.coin += 4
    }
  },

  /** @param {event} event @param {self} self */
  Banana: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Common/Banana_Peel')
          event.log.push(`香蕉(${self.position})被消除了,添加了一个香蕉皮`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Banana_Peel: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id === 'Thief') {
        event.removeSymbols.push(self)
        event.removeSymbols.push(SlotMachine[i])
        event.log.push(`香蕉皮(${self.position})消除了小偷(${i})并消除了自己`)
      }
    }
  },

  /** @param {event} event @param {self} self */
  Bee: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Flower':
        case 'Beehive':
        case 'Honey':
          SlotMachine[i].times += 2
          self.coin++
      }
    }
  },

  /** @param {event} event @param {self} self */
  Beer: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Bounty_Hunter: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id === 'Thief') {
        log.push(`${SlotMachine[i].name}(${i})`)
        self.coin += 20
        event.removeSymbols.push(SlotMachine[i])
      }
    }
    if (log.length) {
      event.log.push(`赏金猎人(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Bubble: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 3) {
      event.removeSymbols.push(self)
      event.log.push(`泡泡(${self.position})消除了自身`)
    }
  },

  /** @param {event} event @param {self} self */
  Candy: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Cat: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id === 'Milk') {
        log.push(`${SlotMachine[i].name}(${i})`)
        self.coin += 9
        event.removeSymbols.push(SlotMachine[i])
      }
    }
    if (log.length) {
      event.log.push(`猫咪(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Cheese: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Cherry: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Coal: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 20) {
      event.removeSymbols.push(self)
      event.addSymbols.push('VeryRare/Diamond')
      event.log.push(`煤炭(${self.position})变成了钻石`)
    }
  },

  /** @param {event} event @param {self} self */
  Coin: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Crab: function (SlotMachine, event, self) {
    for (const i of getLinePositions(self.x, self.y)) {
      if (SlotMachine[i].id === 'Crab') {
        self.coin += 3
      }
    }
  },

  /** @param {event} event @param {self} self */
  Crow: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 4 === 0) {
      self.coin += -3
    }
  },

  /** @param {event} event @param {self} self */
  Cultist: function (SlotMachine, event, self) {
    // 1个 都给0 总计0  √
    // 2个 都给1 总计2  √
    // 3个 都给3 总计9
    // 4个 都给4 总计12
    // 5个 都给5 总计25
    // 6个 都给6 总计36
    const log = []
    for (const i in SlotMachine) {
      if (i != self.position && SlotMachine[i].id === 'Cultist') {
        log.push(i)
      }
    }
    if (log.length) {
      if (log.length >= 2) {
        self.coin++
      }
      for (const i of log) {
        SlotMachine[i].coin++
      }
    }
  },

  /** @param {event} event @param {self} self */
  Dog: function (SlotMachine, event, self) {
    adjacent: for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Robin_Hood':
        case 'Thief':
        case 'Billionaire':
        case 'Cultist':
        case 'Toddler':
        case 'Bounty_Hunter':
        case 'Miner':
        case 'Dwarf':
        case 'King_Midas':
        case 'Gambler':
        case 'General_Zaroff':
        case 'Witch':
        case 'Pirate':
        case 'Ninja':
        case 'Mrs_Fruit':
        case 'Hooligan':
        case 'Farmer':
        case 'Diver':
        case 'Dame':
        case 'Chef':
        case 'Beastmaster':
        case 'Geologist':
        case 'Joker':
        case 'Comedian':
        case 'Card_Shark':
        case 'Bartender':
          self.coin += 2
          break adjacent
      }
    }
  },

  /** @param {event} event @param {self} self */
  Dwarf: function (SlotMachine, event, self) {
    const log = []
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Beer':
        case 'Wine':
          log.push(`${SlotMachine[i].name}(${i})`)
          coin += (SlotMachine[i].coin * 10)
      }
    }
    if (log.length) {
      event.log.push(`矮人(${self.position})消除了相邻的${log.join('、')}`)
      self.coin += coin
    }
  },

  /** @param {event} event @param {self} self */
  Egg: function (SlotMachine, event, self) {
    if (Math.random() < 0.1) {
      event.addSymbols.push('Uncommon/Chick')
      event.removeSymbols.push(self)
      event.log.push(`蛋${self.position}变成了小鸡`)
    }
  },

  /** @param {event} event @param {self} self */
  Flower: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Gambler: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count += 2
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        for (const i in SlotMachine) {
          switch (SlotMachine[i].id) {
            case 'Five_Sided_Die':
            case 'Three_Sided_Die':
              if (SlotMachine[i].count == 1) {
                event.removeSymbols(self)
                event.log.push(`赌徒(${self.position})被消除了`)
                self.coin += self.count
              }
          }
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Goldfish: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id === 'Bubble') {
        event.removeSymbols.push(SlotMachine[i])
        self.coin += 15
        log.push(`泡泡(${i})`)
      }
    }
    if (log.length) {
      event.log.push(`金鱼(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Goose: function (SlotMachine, event, self) {
    if (Math.random() < 0.01) {
      event.addSymbols.push('Rare/Golden_Egg')
      event.log.push(`鹅(${self.position})添加了1个金蛋`)
    }
  },

  /** @param {event} event @param {self} self */
  Key: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Lockbox':
        case 'Safe':
        case 'Treasure_Chest':
        case 'Mega_Chest':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
      }
    }
    if (log.length) {
      event.log.push(`钥匙(${self.position})消除了相邻的${log.join('、')},并消除了自己`)
      event.removeSymbols.push(self)
    }
  },

  /** @param {event} event @param {self} self */
  Light_Bulb: function (SlotMachine, event, self) {
    let flag = false
    adjacent: for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Void_Stone':
        case 'Amethyst':
        case 'Pearl':
        case 'Shiny_Pebble':
        case 'Sapphire':
        case 'Emerald':
        case 'Ruby':
        case 'Diamond':
          SlotMachine[i].times += 2
          if (!self.count) self.count = 0
          self.count++
          if (self.count == 5) {
            event.removeSymbols.push(self)
            flag = true
            break adjacent
          }
      }
    }
    if (flag) {
      event.log.push(`电灯泡(${self.position})消除了自己`)
      event.removeSymbols.push(self)
    }
  },

  /** @param {event} event @param {self} self */
  Lockbox: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 15
          event.log.push(`带锁箱(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Magpie: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 4 === 0) {
      self.coin += 9
    }
  },

  /** @param {event} event @param {self} self */
  Milk: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Miner: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Ore':
        case 'Big_Ore':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin += 20
      }
    }
    if (log.length) {
      event.log.push(`旷工(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Monkey: function (SlotMachine, event, self) {
    const log = []
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Banana':
        case 'Coconut':
        case 'Coconut_Half':
          log.push(`${SlotMachine[i].name}(${i})`)
          coin += (SlotMachine[i].coin * 6)
      }
    }
    if (log.length) {
      event.log.push(`猴子(${self.position})消除了相邻的${log.join('、')}`)
      self.coin += coin
    }
  },

  /** @param {event} event @param {self} self */
  Mouse: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Cheese':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin += 20
      }
    }
    if (log.length) {
      event.log.push(`老鼠(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Ore: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          const addSymbols = [
            { id: 'Uncommon/Void_Stone', name: '虚空之石' },
            { id: 'Rare/Amethyst', name: '紫水晶' },
            { id: 'Common/Pearl', name: '珍珠' },
            { id: 'Common/Shiny_Pebble', name: '闪亮鹅卵石' },
            { id: 'Uncommon/Sapphire', name: '蓝宝石' },
            { id: 'Rare/Emerald', name: '绿宝石' },
            { id: 'Rare/Ruby', name: '红宝石' },
            { id: 'VeryRare/Diamond', name: '钻石' }
          ]
          const i = Math.floor(Math.random() * addSymbols.length)
          event.addSymbols.push(addSymbols[i].id)
          event.log.push(`矿石(${self.position})被消除了,添加1个${addSymbols[i].name}`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Owl: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 3 === 0) {
      self.coin++
    }
  },

  /** @param {event} event @param {self} self */
  Oyster: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Common/Pearl')
          event.log.push(`牡蛎(${self.position})被消除了,添加1个珍珠`)
        }
      }
    )
    if (Math.random() < 0.2) {
      event.addSymbols.push('Common/Pearl')
      event.log.push(`牡蛎(${self.position})添加了1个珍珠`)
    }
  },

  /** @param {event} event @param {self} self */
  Pearl: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Present: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count === 12) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 10
          event.log.push(`礼物(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Seed: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        const flag = SlotMachine[self.position].rain ? 0.75 : 0.25
        if (Math.random() < flag) {
          const addSymbols = [
            { id: 'Uncommon/Void_Fruit', name: '虚空水果' },
            { id: 'Common/Banana', name: '香蕉' },
            { id: 'Common/Cherry', name: '樱桃' },
            { id: 'Uncommon/Coconut', name: '椰子' },
            { id: 'Common/Flower', name: '花' },
            { id: 'Rare/Pear', name: '梨' },
            { id: 'Uncommon/Orange', name: '橙子' },
            { id: 'Uncommon/Peach', name: '桃子' },
            { id: 'Rare/Apple', name: '苹果' },
            { id: 'Rare/Strawberry', name: '草莓' },
            { id: 'VeryRare/Watermelon', name: '西瓜' }
          ]
          const i = Math.floor(Math.random() * addSymbols.length)
          event.addSymbols.push(addSymbols[i].id)
          event.removeSymbols.push(self)
          event.log.push(`种子(${self.position})成长为${addSymbols[i].name}`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Shiny_Pebble: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Snail: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 4 === 0) {
      self.coin += 5
    }
  },

  /** @param {event} event @param {self} self */
  Three_Sided_Die: function (SlotMachine, event, self) {
    const coin = Math.floor(Math.random() * 3) + 1
    self.coin += coin
    self.image = `Symbols/Common/Three_Sided_Die${coin === 3 ? '' : coin}`
  },

  /** @param {event} event @param {self} self */
  Toddler: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Present':
        case 'Candy':
        case 'PinFata':
        case 'Bubble':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin += 6
      }
    }
    if (log.length) {
      event.log.push(`幼儿(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Turtle: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 3 === 0) {
      self.coin += 4
    }
  },

  /** @param {event} event @param {self} self */
  Urn: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Rare/Spirit')
          event.log.push(`骨灰瓮(${self.position})被消除了,添加1个幽灵`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Bar_of_Soap: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    event.addSymbols.push('Common/Bubble')
    event.log.push(`肥皂条(${self.position})添加了1个泡泡`)
    if (self.count === 3) {
      event.removeSymbols.push(self)
      event.log.push(`肥皂条(${self.position})消除了自身`)
    }
  },

  /** @param {event} event @param {self} self */
  Bear: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Honey':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin += 40
      }
    }
    if (log.length) {
      event.log.push(`熊(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Big_Ore: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          const log = []
          for (let index = 0; index < 2; index++) {
            const addSymbols = [
              { id: 'Uncommon/Void_Stone', name: '虚空之石' },
              { id: 'Rare/Amethyst', name: '紫水晶' },
              { id: 'Common/Pearl', name: '珍珠' },
              { id: 'Common/Shiny_Pebble', name: '闪亮鹅卵石' },
              { id: 'Uncommon/Sapphire', name: '蓝宝石' },
              { id: 'Rare/Emerald', name: '绿宝石' },
              { id: 'Rare/Ruby', name: '红宝石' },
              { id: 'VeryRare/Diamond', name: '钻石' }
            ]
            const i = Math.floor(Math.random() * addSymbols.length)
            event.addSymbols.push(addSymbols[i].id)
            log.push(addSymbols[i].name)
          }
          event.log.push(`巨矿(${self.position})被消除了,添加${log.join('、')}`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Big_Urn: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 2; i++) {
            event.addSymbols.push('Rare/Spirit')
          }
          event.log.push(`大骨灰瓮(${self.position})被消除了,添加2个幽灵`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Billionaire: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Cheese':
        case 'Wine':
          SlotMachine[i].times += 2
          event.log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 39
          event.log.push(`亿万富翁(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Bronze_Arrow: function (SlotMachine, event, self) {
    const Target = []
    const positions = getDiagonalPositions(self.x, self.y)
    const rand = Math.floor(Math.random() * 8) + 1
    const key = Object.keys(positions)[rand - 1]
    self.image = `Symbols/Uncommon/Bronze_Arrow${key === 1 ? '' : key}`
    for (const i of positions[key]) {
      if (SlotMachine[i]) {
        switch (SlotMachine[i].id) {
          case 'Target':
            event.removeSymbols.push(SlotMachine[i])
            Target.push(`目标(${i})`)
          // eslint-disable-next-line no-fallthrough
          default:
            SlotMachine[i].times += 2
        }
      }
    }
    if (Target.length) {
      event.log.push(`铜箭(${self.position})消除了${Target.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Buffing_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i]) {
        SlotMachine[i].times += 2
        log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    if (log.length) {
      event.log.push(`增益胶囊(${self.position})消除了自身`)
    }
  },

  /** @param {event} event @param {self} self */
  Chemical_Seven: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    event.addItems.push('Common/Lucky_Seven')
    event.log.push(`第七种化学品(${self.position})被消除了,添加了1个物品:幸运七`)
  },

  /** @param {event} event @param {self} self */
  Chick: function (SlotMachine, event, self) {
    if (Math.random() < 0.1) {
      event.addSymbols.push('Rare/Chicken')
      event.removeSymbols.push(self)
      event.log.push(`小鸡${self.position}变成了大鸡`)
    }
  },
  /** @param {event} event @param {self} self */
  Clubs: function (SlotMachine, event, self) {
    const log = []
    let count = 0
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
          coin++
          log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          count++
      }
    }
    if (count >= 3) {
      coin *= 2
    }
    if (log.length) {
      for (const i of log) {
        const position = i.replace(/.*\((\d+,\d+)\)/, '$1').trim()
        SlotMachine[position].coin += coin
      }
    }
  },

  /** @param {event} event @param {self} self */
  Coconut: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 2; i++) {
            event.addSymbols.push('Uncommon/Coconut_Half')
          }
          event.log.push(`椰子(${self.position})被消除了,添加2个半个椰子`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Coconut_Half: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Diamonds: function (SlotMachine, event, self) {
    const log = []
    let count = 0
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Diamonds':
        case 'Hearts':
          coin++
          log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          count++
      }
    }
    if (count >= 3) {
      coin *= 2
    }
    if (log.length) {
      for (const i of log) {
        const position = i.replace(/.*\((\d+,\d+)\)/, '$1').trim()
        SlotMachine[position].coin += coin
      }
    }
  },

  /** @param {event} event @param {self} self */
  Essence_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    // TODO
  },

  /** @param {event} event @param {self} self */
  Five_Sided_Die: function (SlotMachine, event, self) {
    const coin = Math.floor(Math.random() * 5) + 1
    self.coin += coin
    self.image = `Symbols/Common/Three_Sided_Die${coin === 5 ? '' : coin}`
  },

  /** @param {event} event @param {self} self */
  Golem: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count === 5) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 5; i++) {
            event.addSymbols.push('Common/Ore')
          }
          event.log.push(`石巨人(${self.position})被消除了,添加5个矿石`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Hearts: function (SlotMachine, event, self) {
    const log = []
    let count = 0
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Diamonds':
        case 'Hearts':
          coin++
          log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          count++
      }
    }
    if (count >= 3) {
      coin *= 2
    }
    if (log.length) {
      for (const i of log) {
        const position = i.replace(/.*\((\d+,\d+)\)/, '$1').trim()
        SlotMachine[position].coin += coin
      }
    }
  },

  /** @param {event} event @param {self} self */
  Hex_of_Destruction: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i]) {
        if (Math.random() < 0.3) {
          event.removeSymbols.push(SlotMachine[i])
          log.push(`${SlotMachine[i].name}(${i})`)
        }
      }
    }
    if (log.length) {
      event.log.push(`破坏魔法(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Hex_of_Draining: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i]) {
        if (Math.random() < 0.3) {
          SlotMachine[i].coin += -SlotMachine[i].payout
        }
      }
    }
  },

  /** @param {event} event @param {self} self */
  Hex_of_Emptiness: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Hex_of_Hoarding: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Hex_of_Midas: function (SlotMachine, event, self) {
    if (Math.random() < 0.3) {
      event.addSymbols.push('Common/Coin')
      event.log.push(`迈达斯魔法(${self.position})添加了1个硬币`)
    }
  },

  /** @param {event} event @param {self} self */
  Hex_of_Tedium: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Hex_of_Thievery: function (SlotMachine, event, self) {
    if (Math.random() < 0.3) {
      self.coin -= 6
    }
  },

  /** @param {event} event @param {self} self */
  Hooligan: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Urn':
        case 'Big_Urn':
        case 'Tomb':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin += 6
      }
    }
    if (log.length) {
      event.log.push(`流氓(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Hustling_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addItems.push('Common/Pool_Ball')
          event.log.push(`诈骗胶囊(${self.position})被消除了,添加了1个物品:台球`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Item_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    // TODO
  },

  /** @param {event} event @param {self} self */
  Jellyfish: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Lucky_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    // TODO
  },

  /** @param {event} event @param {self} self */
  Matryoshka_Doll: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 3) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Special/Matryoshka_Doll_2')
          event.log.push(`俄罗斯套娃(${self.position})旋转了3次,变成了俄罗斯套娃2`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Ninja: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      if (i != self.position && SlotMachine[i].id === 'Ninja') {
        log.push(i)
      }
    }
    if (log.length) {
      const coin = 1
      log.push(self.position)
      for (const i of log) {
        SlotMachine[i].coin -= coin
      }
    }
  },

  /** @param {event} event @param {self} self */
  Orange: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Peach: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Common/Seed')
          event.log.push(`桃子(${self.position})被消除了,添加1个种子`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  PinFata: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 7; i++) {
            event.addSymbols.push('Common/Candy')
          }
          event.log.push(`彩罐(${self.position})被消除了,添加7个糖果`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Pufferfish: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Rabbit: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count >= 10) {
      self.coin += 2
    }
  },

  /** @param {event} event @param {self} self */
  Rabbit_Fluff: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Rain: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Flower':
          SlotMachine[i].times += 2
          break
        case 'Seed':
          SlotMachine[i].rain = true
      }
    }
  },

  /** @param {event} event @param {self} self */
  Removal_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    // TODO
  },

  /** @param {event} event @param {self} self */
  Safe: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 30
          event.log.push(`保险箱(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Sand_Dollar: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 10
          event.log.push(`沙钱(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Sapphire: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Sloth: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count % 2 === 0) {
      self.coin += 4
    }
  },

  /** @param {event} event @param {self} self */
  Spades: function (SlotMachine, event, self) {
    const log = []
    let count = 0
    let coin = 0
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
          coin++
          log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          count++
      }
    }
    if (count >= 3) {
      coin *= 2
    }
    if (log.length) {
      for (const i of log) {
        const position = i.replace(/.*\((\d+,\d+)\)/, '$1').trim()
        SlotMachine[position].coin += coin
      }
    }
  },

  /** @param {event} event @param {self} self */
  Target: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 10
          event.log.push(`目标(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Tedium_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    self.coin += 5
    // TODO
  },

  /** @param {event} event @param {self} self */
  Thief: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count += 4
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += self.count
          event.log.push(`小偷(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Time_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    // TODO
  },

  /** @param {event} event @param {self} self */
  Void_Creature: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id == 'Empty') {
        SlotMachine[i].coin++
        log.push(i)
      }
    }
    if (log.length == 0) {
      event.removeSymbols.push(self)
      self.coin += 8
      event.log.push(`虚空生物(${self.position})被消除了`)
    }
  },

  /** @param {event} event @param {self} self */
  Void_Fruit: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id == 'Empty') {
        SlotMachine[i].coin++
        log.push(i)
      }
    }
    if (log.length == 0) {
      event.removeSymbols.push(self)
      self.coin += 8
      event.log.push(`虚空水果(${self.position})被消除了`)
    }
  },

  /** @param {event} event @param {self} self */
  Void_Stone: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i].id == 'Empty') {
        SlotMachine[i].coin++
        log.push(i)
      }
    }
    if (log.length == 0) {
      event.removeSymbols.push(self)
      self.coin += 8
      event.log.push(`虚空之石(${self.position})被消除了`)
    }
  },

  /** @param {event} event @param {self} self */
  Wealthy_Capsule: function (SlotMachine, event, self) {
    event.removeSymbols.push(self)
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 10
          event.log.push(`财富胶囊(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Wine: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count >= 8) {
      self.coin += 1
    }
  },

  /** @param {event} event @param {self} self */
  Wolf: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Amethyst: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.coin += self.count
    const oldCoin = self.coin
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (SlotMachine[self.position].coin > oldCoin) {
          self.count++
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Apple: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Bartender: function (SlotMachine, event, self) {
    if (Math.random() < 0.1) {
      const addSymbols = [
        { id: 'Common/Chemical_Seven', name: '第七种化学品' },
        { id: 'Common/Beer', name: '啤酒' },
        { id: 'Uncommon/Wine', name: '葡萄酒' },
        { id: 'Rare/Martini', name: '马提尼酒' }
      ]
      const i = Math.floor(Math.random() * addSymbols.length)
      event.addSymbols.push(addSymbols[i].id)
      event.log.push(`酒保(${self.position})添加了1个${addSymbols[i].name}`)
    }
  },

  /** @param {event} event @param {self} self */
  Beastmaster: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Magpie':
        case 'Void_Creature':
        case 'Turtle':
        case 'Snail':
        case 'Sloth':
        case 'Oyster':
        case 'Owl':
        case 'Mouse':
        case 'Monkey':
        case 'Rabbit':
        case 'Goose':
        case 'Goldfish':
        case 'Dog':
        case 'Crab':
        case 'Chick':
        case 'Cat':
        case 'Bee':
        case 'Sand_Dollar':
        case 'Wolf':
        case 'Pufferfish':
        case 'Jellyfish':
        case 'Dove':
        case 'Crow':
        case 'Chicken':
        case 'Bear':
        case 'Cow':
        case 'Eldritch_Creature':
          SlotMachine[i].times += 2
      }
    }
  },

  /** @param {event} event @param {self} self */
  Beehive: function (SlotMachine, event, self) {
    if (Math.random() < 0.1) {
      event.addSymbols.push('Rare/Honey')
      event.log.push(`蜂巢(${self.position})添加了1个蜂蜜`)
    }
  },

  /** @param {event} event @param {self} self */
  Card_Shark: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          event.callback.push(
            /** @param {event} event */
            (SlotMachine, event) => {
              let payout = 0
              for (const a of getAdjacentPositions(SlotMachine[i].x, SlotMachine[i].y)) {
                if (SlotMachine[a] && (SlotMachine[a].coin + SlotMachine[a].payout) > payout) {
                  payout = SlotMachine[a].payout + SlotMachine[a].payout
                }
              }
              SlotMachine[i].coin += payout
            }
          )
      }
    }
  },

  /** @param {event} event @param {self} self */
  Chef: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Chemical_Seven':
        case 'Void_Fruit':
        case 'Banana':
        case 'Beer':
        case 'Candy':
        case 'Cheese':
        case 'Cherry':
        case 'Egg':
        case 'Pear':
        case 'Milk':
        case 'Wine':
        case 'Coconut_Half':
        case 'Orange':
        case 'Peach':
        case 'Strawberry':
        case 'Omelette':
        case 'Martini':
        case 'Honey':
        case 'Apple':
        case 'Golden_Egg':
        case 'Watermelon':
          SlotMachine[i].times += 2
      }
    }
  },

  /** @param {event} event @param {self} self */
  Chicken: function (SlotMachine, event, self) {
    if (Math.random() < 0.05) {
      event.addSymbols.push('Common/Egg')
      event.log.push(`大鸡(${self.position})添加了1个蛋`)
    }
    if (Math.random() < 0.01) {
      event.addSymbols.push('Rare/Golden_Egg')
      event.log.push(`大鸡(${self.position})添加了1个金蛋`)
    }
  },

  /** @param {event} event @param {self} self */
  Comedian: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Banana':
        case 'Banana_Peel':
        case 'Dog':
        case 'Monkey':
        case 'Toddler':
        case 'Joker':
          event.log.push(`${SlotMachine[i].name}(${i})`)
          SlotMachine[i].times += 3
      }
    }
  },

  /** @param {event} event @param {self} self */
  Cow: function (SlotMachine, event, self) {
    if (Math.random() < 0.15) {
      event.addSymbols.push('Common/Milk')
      event.log.push(`牛(${self.position})添加了1个牛奶`)
    }
  },

  /** @param {event} event @param {self} self */
  Dame: function (SlotMachine, event, self) {
    const remove = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Void_Stone':
        case 'Amethyst':
        case 'Pearl':
        case 'Shiny_Pebble':
        case 'Sapphire':
        case 'Emerald':
        case 'Ruby':
        case 'Diamond':
          SlotMachine[i].times += 2
          break
        case 'Martini':
          event.removeSymbols.push(SlotMachine[i])
          remove.push(`马提尼酒(${i})`)
          self.coin += 40
      }
    }
    if (remove.length) {
      event.log.push(`贵妇(${self.position})消除了相邻的${remove.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Diver: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Snail':
        case 'Turtle':
        case 'Anchor':
        case 'Crab':
        case 'Goldfish':
        case 'Oyster':
        case 'Pearl':
        case 'Jellyfish':
        case 'Pufferfish':
        case 'Sand_Dollar':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
      }
    }
    if (log.length) {
      self.count += log.length
      event.log.push(`潜水员(${self.position})消除了相邻的${log.join('、')}`)
    }
    self.coin += self.count
  },

  /** @param {event} event @param {self} self */
  Dove: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        for (const i of getAdjacentPositions(self.x, self.y)) {
          if (SlotMachine[i]) {
            const index = event.removeSymbols.findIndex(item => item.rand == SlotMachine[i].rand)
            if (index > -1) {
              event.removeSymbols.splice(index, 1)
              if (!SlotMachine[i].extra) SlotMachine[i].extra = 0
              SlotMachine[i].extra++
              event.log.push(`鸽子(${self.position})使${SlotMachine[i].name}(${i})不被消除`)
            }
          }
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Emerald: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Emerald':
          log.push(`绿宝石(${i})`)
      }
    }
    if (log.length >= 2) {
      self.coin++
    }
  },

  /** @param {event} event @param {self} self */
  Farmer: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Seed':
          SlotMachine[i].rain = true
        // eslint-disable-next-line no-fallthrough
        case 'Void_Fruit':
        case 'Banana':
        case 'Cheese':
        case 'Cherry':
        case 'Chick':
        case 'Coconut':
        case 'Egg':
        case 'Flower':
        case 'Milk':
        case 'Pear':
        case 'Chicken':
        case 'Orange':
        case 'Peach':
        case 'Strawberry':
        case 'Cow':
        case 'Apple':
        case 'Golden_Egg':
        case 'Watermelon':
          event.log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
  },

  /** @param {event} event @param {self} self */
  Frozen_Fossil: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        const rmSymbols = [
          'Cultist',
          'Witch',
          'Hex_of_Destruction',
          'Hex_of_Draining',
          'Hex_of_Emptiness',
          'Hex_of_Hoarding',
          'Hex_of_Midas',
          'Hex_of_Tedium',
          'Hex_of_Thievery'
        ]
        const result = event.removeSymbols.filter(item => rmSymbols.includes(item.id))
        if (result.length) {
          self.count += (result.length * 5)
        }
        if (self.count >= 0) {
          event.removeSymbols.push(self)
        }
        if (event.removeSymbols.some(i => i.rand == self.rand)) {
          event.addSymbols.push('VeryRare/Eldritch_Creature')
          event.log.push(`冰冻化石(${self.position})被消除了,添加1个怪异生物`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  General_Zaroff: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Robin_Hood':
        case 'Thief':
        case 'Billionaire':
        case 'Cultist':
        case 'Toddler':
        case 'Bounty_Hunter':
        case 'Miner':
        case 'Dwarf':
        case 'King_Midas':
        case 'Gambler':
        case 'General_Zaroff':
        case 'Witch':
        case 'Pirate':
        case 'Ninja':
        case 'Mrs_Fruit':
        case 'Hooligan':
        case 'Farmer':
        case 'Diver':
        case 'Dame':
        case 'Chef':
        case 'Beastmaster':
        case 'Geologist':
        case 'Joker':
        case 'Comedian':
        case 'Card_Shark':
        case 'Bartender':
          log.push(`${SlotMachine[i].name}(${i})`)
          self.coin += 25
      }
    }
    if (log.length) {
      event.log.push(`扎罗夫将军(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Geologist: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Ore':
        case 'Pearl':
        case 'Shiny_Pebble':
        case 'Big_Ore':
        case 'Sapphire':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.count++
      }
    }
    if (log.length) {
      event.log.push(`地质学家(${self.position})消除了相邻的${log.join('、')}`)
    }
    self.coin += self.count
  },

  /** @param {event} event @param {self} self */
  Golden_Egg: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Honey: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Joker: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Clubs':
        case 'Spades':
        case 'Diamonds':
        case 'Hearts':
          SlotMachine[i].times += 2
      }
    }
  },

  /** @param {event} event @param {self} self */
  King_Midas: function (SlotMachine, event, self) {
    event.addSymbols.push('Common/Coin')
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Coin':
          SlotMachine[i].times += 3
      }
    }
  },

  /** @param {event} event @param {self} self */
  Magic_Key: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Lockbox':
        case 'Safe':
        case 'Treasure_Chest':
        case 'Mega_Chest':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          SlotMachine[i].times += 3
      }
    }
    if (log.length) {
      event.log.push(`魔法钥匙(${self.position})消除了相邻的${log.join('、')},并消除了自己`)
      event.removeSymbols.push(self)
    }
  },

  /** @param {event} event @param {self} self */
  Martini: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Mine: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    event.addSymbols.push('Common/Ore')
    if (self.count == 4) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addItems.push('Common/Mining_Pick')
          event.log.push(`矿井(${self.position})被消除了,添加了1个物品:矿稿`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Moon: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Owl':
        case 'Rabbit':
        case 'Wolf':
          SlotMachine[i].times += 3
      }
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 3; i++) {
            event.addSymbols.push('Common/Cheese')
          }
          event.log.push(`月亮(${self.position})被消除了,添加了3个奶酪`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Mrs_Fruit: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Banana':
        case 'Cherry':
        case 'Coconut':
        case 'Coconut_Half':
        case 'Orange':
        case 'Peach':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.count++
      }
    }
    if (log.length) {
      event.log.push(`弗鲁特女士(${self.position})消除了相邻的${log.join('、')}`)
    }
    self.coin += self.count
  },

  /** @param {event} event @param {self} self */
  Omelette: function (SlotMachine, event, self) {
    adjacent: for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Cheese':
        case 'Egg':
        case 'Milk':
        case 'Omelette':
        case 'Golden_Egg':
          self.coin += 2
          break adjacent
      }
    }
  },

  /** @param {event} event @param {self} self */
  Pear: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.coin += self.count
    const oldCoin = self.coin
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (SlotMachine[self.position].coin > oldCoin) {
          self.count++
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Robin_Hood: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    let log = ''
    if (self.count % 4 == 0) {
      self.coin += 25
      log += `罗宾汉(${self.position})旋转了4次,给予25枚硬币,`
    }
    const coin = []
    const remove = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Thief':
        case 'Bronze_Arrow':
        case 'Golden_Arrow':
        case 'Silver_Arrow':
          SlotMachine[i].coin += 3
          coin.push(`${SlotMachine[i].name}(${i})`)
          break
        case 'Billionaire':
        case 'Target':
        case 'Apple':
          event.removeSymbols.push(SlotMachine[i])
          remove.push(`${SlotMachine[i].name}(${i})`)
          self.coin += 15
      }
    }
    if (coin.length) {
      if (!log) log += `罗宾汉(${self.position})`
      log += `与${coin.join('、')}相邻,使其额外给予3枚硬币,`
    }
    if (remove.length) {
      if (!log) log += `罗宾汉(${self.position})`
      log += `消除了相邻的${coin.join('、')},给予${remove.length * 15}枚硬币`
    }
  },

  /** @param {event} event @param {self} self */
  Ruby: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Ruby':
          log.push(`红宝石(${i})`)
      }
    }
    if (log.length >= 2) {
      self.coin++
    }
  },

  /** @param {event} event @param {self} self */
  Silver_Arrow: function (SlotMachine, event, self) {
    const Target = []
    const positions = getDiagonalPositions(self.x, self.y)
    const rand = Math.floor(Math.random() * 8) + 1
    const key = Object.keys(positions)[rand - 1]
    self.image = `Symbols/Rare/Silver_Arrow${key === 1 ? '' : key}`
    for (const i of positions[key]) {
      if (SlotMachine[i]) {
        switch (SlotMachine[i].id) {
          case 'Target':
            event.removeSymbols.push(SlotMachine[i])
            Target.push(`目标(${i})`)
          default:
            SlotMachine[i].times += 3
        }
      }
    }
    if (Target.length) {
      event.log.push(`银箭(${self.position})消除了${Target.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Spirit: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 4) {
      event.removeSymbols.push(self)
      event.log.push(`幽灵${self.position}消除了自身`)
    }
  },

  /** @param {event} event @param {self} self */
  Strawberry: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      switch (SlotMachine[i].id) {
        case 'Strawberry':
          log.push(`草莓(${i})`)
      }
    }
    if (log.length >= 2) {
      self.coin++
    }
  },

  /** @param {event} event @param {self} self */
  Sun: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Flower':
          SlotMachine[i].times += 5
          break
        case 'Seed':
          SlotMachine[i].rain = true
      }
    }
  },

  /** @param {event} event @param {self} self */
  Tomb: function (SlotMachine, event, self) {
    if (Math.random() < 0.06) {
      event.addSymbols.push('Rare/Spirit')
      event.log.push(`坟墓(${self.position})添加了1个幽灵`)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          for (let i = 0; i < 4; i++) {
            event.addSymbols.push('Rare/Spirit')
          }
          event.log.push(`坟墓(${self.position})被消除了,添加4个幽灵`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Treasure_Chest: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 50
          event.log.push(`藏宝箱(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Witch: function (SlotMachine, event, self) {
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Cat':
        case 'Owl':
        case 'Crow':
        case 'Apple':
        case 'Hex_of_Destruction':
        case 'Hex_of_Draining':
        case 'Hex_of_Emptiness':
        case 'Hex_of_Hoarding':
        case 'Hex_of_Midas':
        case 'Hex_of_Tedium':
        case 'Hex_of_Thievery':
        case 'Eldritch_Creature':
        case 'Spirit':
          SlotMachine[i].times += 2
      }
    }
  },

  /** @param {event} event @param {self} self */
  Diamond: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      if (i == self.position) continue
      switch (SlotMachine[i].id) {
        case 'Diamond':
          log.push(i)
      }
    }
    if (log.length) {
      log.push(self.position)
      for (const i of log) {
        SlotMachine[i].coin += log.length
      }
    }
  },

  /** @param {event} event @param {self} self */
  Eldritch_Creature: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Cultist':
        case 'Witch':
        case 'Hex_of_Destruction':
        case 'Hex_of_Draining':
        case 'Hex_of_Emptiness':
        case 'Hex_of_Hoarding':
        case 'Hex_of_Midas':
        case 'Hex_of_Tedium':
        case 'Hex_of_Thievery':
          log.push(`${SlotMachine[i].name}(${i})`)
          event.removeSymbols.push(SlotMachine[i])
          self.coin++
      }
    }
    if (log.length) {
      event.log.push(`怪异生物(${self.position})消除了相邻的${log.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Golden_Arrow: function (SlotMachine, event, self) {
    const Target = []
    const positions = getDiagonalPositions(self.x, self.y)
    const rand = Math.floor(Math.random() * 8) + 1
    const key = Object.keys(positions)[rand - 1]
    self.image = `Symbols/VeryRare /Golden_Arrow${key === 1 ? '' : key}`
    for (const i of positions[key]) {
      if (SlotMachine[i]) {
        switch (SlotMachine[i].id) {
          case 'Target':
            event.removeSymbols.push(SlotMachine[i])
            Target.push(`目标(${i})`)
          default:
            SlotMachine[i].times += 5
        }
      }
    }
    if (Target.length) {
      event.log.push(`金箭(${self.position})消除了${Target.join('、')}`)
    }
  },

  /** @param {event} event @param {self} self */
  Highlander: function (SlotMachine, event, self) {
    // TODO
  },

  /** @param {event} event @param {self} self */
  Mega_Chest: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          self.coin += 100
          event.log.push(`巨大宝箱(${self.position})被消除了`)
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Midas_Bomb: function (SlotMachine, event, self) {
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      if (SlotMachine[i]) {
        event.removeSymbols.push(SlotMachine[i])
        SlotMachine[i].times += 7
        log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    event.removeSymbols.push(self)
    event.log.push(`迈达斯魔法${self.position}消除了自身${log.length ? `并消除了相邻的${log.join('、')}` : ''}`)
  },

  /** @param {event} event @param {self} self */
  Pirate: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    const log = []
    for (const i of getAdjacentPositions(self.x, self.y)) {
      switch (SlotMachine[i].id) {
        case 'Anchor':
        case 'Beer':
        case 'Coin':
        case 'Lockbox':
        case 'Safe':
        case 'Orange':
        case 'Treasure_Chest':
        case 'Mega_Chest':
          event.removeSymbols.push(SlotMachine[i])
          log.push(`${SlotMachine[i].name}(${i})`)
      }
    }
    if (log.length) {
      self.count += log.length
      event.log.push(`海盗${self.position}消除了相邻的${log.join('、')}`)
    }
    self.coin += self.count
  },

  /** @param {event} event @param {self} self */
  Watermelon: function (SlotMachine, event, self) {
    const log = []
    for (const i in SlotMachine) {
      if (i == self.position) continue
      switch (SlotMachine[i].id) {
        case 'Watermelon':
          log.push(i)
      }
    }
    if (log.length) {
      log.push(self.position)
      for (const i of log) {
        SlotMachine[i].coin += log.length
      }
    }
  },

  /** @param {event} event @param {self} self */
  Wildcard: function (SlotMachine, event, self) {
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        const payout = 0
        // TODO: 忘记这里是什么了
        // for (const a of getAdjacentPositions(SlotMachine[i].x, SlotMachine[i].y)) {
        //   if (SlotMachine[a] && (SlotMachine[a].coin + SlotMachine[a].payout) > payout) {
        //     payout = SlotMachine[a].coin + SlotMachine[a].payout
        //   }
        // }
        self.coin = payout
      }
    )
  },

  /** @param {event} event @param {self} self */
  Matryoshka_Doll_2: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 5) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Special/Matryoshka_Doll_3')
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Matryoshka_Doll_3: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 7) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Special/Matryoshka_Doll_4')
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Matryoshka_Doll_4: function (SlotMachine, event, self) {
    if (!self.count) self.count = 0
    self.count++
    if (self.count == 9) {
      event.removeSymbols.push(self)
    }
    event.callback.push(
      /** @param {event} event */
      (SlotMachine, event) => {
        if (event.removeSymbols.some(i => i.rand === self.rand)) {
          event.addSymbols.push('Special/Matryoshka_Doll_5')
        }
      }
    )
  },

  /** @param {event} event @param {self} self */
  Matryoshka_Doll_5: function (SlotMachine, event, self) { },

  /** @param {event} event @param {self} self */
  Empty: function (SlotMachine, event, self) { }
}

export default {
  Symbols
}
