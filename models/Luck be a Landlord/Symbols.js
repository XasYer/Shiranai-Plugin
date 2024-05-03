// 普通
const Common = {
  Anchor: {
    id: 'Anchor',
    name: '锚',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '位于角落时给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Banana: {
    id: 'Banana',
    name: '香蕉',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[香蕉皮](Symbols/Common/Banana_Peel)'
  },

  Banana_Peel: {
    id: 'Banana_Peel',
    name: '香蕉皮',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[小偷](Symbols/Uncommon/Thief)。在之后<emphasis>消除</emphasis>自身'
  },

  Bee: {
    id: 'Bee',
    name: '蜜蜂',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[花](Symbols/Common/Flower)[蜂巢](Symbols/Rare/Beehive)和[蜂蜜](Symbols/Rare/Honey)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin),如果与[花](Symbols/Common/Flower)[蜂巢](Symbols/Rare/Beehive)或[蜂蜜](Symbols/Rare/Honey)相邻,则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Beer: {
    id: 'Beer',
    name: '啤酒',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Bounty_Hunter: {
    id: 'Bounty_Hunter',
    name: '赏金猎人',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[小偷](Symbols/Uncommon/Thief)。每<emphasis>消除</emphasis>一罐[小偷](Symbols/Uncommon/Thief),可获得<payout>20</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Bubble: {
    id: 'Bubble',
    name: '泡泡',
    rarity: 'Common',
    type: 'Symbols',
    payout: 2,
    description: '在给予[硬币](Symbols/Common/Coin)<emphasis>3次</emphasis>后<emphasis>消除</emphasis>自身。'
  },

  Candy: {
    id: 'Candy',
    name: '糖果',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Cat: {
    id: 'Cat',
    name: '猫咪',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[牛奶](Symbols/Common/Milk)。每<emphasis>消除</emphasis>一罐[牛奶](Symbols/Common/Milk),可获得<payout>9</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Cheese: {
    id: 'Cheese',
    name: '奶酪',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Cherry: {
    id: 'Cherry',
    name: '樱桃',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Coal: {
    id: 'Coal',
    name: '煤炭',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '在<emphasis>20</emphasis>次旋转之后变成[钻石](Symbols/VeryRare/Diamond)'
  },

  Coin: {
    id: 'Coin',
    name: '硬币',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Crab: {
    id: 'Crab',
    name: '螃蟹',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '同一排中<emphasis>每有另外一只</emphasis>[螃蟹](Symbols/Common/Crab),额外给予<payout>3</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Crow: {
    id: 'Crow',
    name: '乌鸦',
    rarity: 'Common',
    type: 'Symbols',
    payout: 2,
    description: '每4次旋转给予-3枚[硬币](Symbols/Common/Coin)'
  },

  Cultist: {
    id: 'Cultist',
    name: '异教徒',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '为<emphasis>每位</emphasis>[异教徒](Symbols/Common/Cultist)给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin),如果有至少<emphasis>3</emphasis>个[异教徒](Symbols/Common/Cultist)，则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Dog: {
    id: 'Dog',
    name: '狗狗',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '如果与[罗宾汉](Symbols/Rare/Robin_Hood)[小偷](Symbols/Uncommon/Thief)[亿万富翁](Symbols/Uncommon/Billionaire)[异教徒](Symbols/Common/Cultist)[幼儿](Symbols/Common/Toddler)[赏金猎人](Symbols/Common/Bounty_Hunter)[旷工](Symbols/Common/Miner)[矮人](Symbols/Common/Dwarf)[迈达斯国王](Symbols/Rare/King_Midas)[赌徒](Symbols/Common/Gambler)[扎罗夫将军](Symbols/Rare/General_Zaroff)[女巫](Symbols/Rare/Witch)[海盗](Symbols/VeryRare/Pirate)[忍者](Symbols/Uncommon/Ninja)[弗鲁特女士](Symbols/Rare/Mrs_Fruit)[流氓](Symbols/Uncommon/Hooligan)[农夫](Symbols/Rare/Farmer)[潜水员](Symbols/Rare/Diver)[贵妇](Symbols/Rare/Dame)[厨师](Symbols/Rare/Chef)[驯兽师](Symbols/Rare/Beastmaster)[地质学家](Symbols/Rare/Geologist)[小丑](Symbols/Rare/Joker)[喜剧演员](Symbols/Rare/Comedian)[纸牌高手](Symbols/Rare/Card_Shark)或[酒保](Symbols/Rare/Bartender)相邻,则额外给予<payout>2</payout>枚[硬币](Symbols/Common/Coin),该效果每次旋转仅适用一次'
  },

  Dwarf: {
    id: 'Dwarf',
    name: '矮人',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[啤酒](Symbols/Common/Beer)和[葡萄酒](Symbols/Uncommon/Wine),给予相当于以这种方式<emphasis>消除</emphasis>的符号的价值<emphasis>10倍</emphasis>的[硬币](Symbols/Common/Coin)'
  },

  Egg: {
    id: 'Egg',
    name: '蛋',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '有<emphasis>10%</emphasis>的几率变成[小鸡](Symbols/Uncommon/Chick)'
  },

  Flower: {
    id: 'Flower',
    name: '花',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Gambler: {
    id: 'Gambler',
    name: '赌徒',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后给予<payout>?</payout>枚[硬币](Symbols/Common/Coin)。每次旋转“<payout>?</payout>枚[硬币](Symbols/Common/Coin)”增加<payout>2</payout>枚[硬币](Symbols/Common/Coin)。当[五面骰子](Symbols/Uncommon/Five_Sided_Die)或[三面骰子](Symbols/Common/Three_Sided_Die)掷出[五面骰子1](Symbols/Uncommon/Five_Sided_Die2)或[三面骰子1](Symbols/Common/Three_Sided_Die1)时，<emphasis>消除</emphasis>自身'
  },

  Goldfish: {
    id: 'Goldfish',
    name: '金鱼',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[泡泡](Symbols/Common/Bubble)。每<emphasis>消除</emphasis>一罐[泡泡](Symbols/Common/Bubble),可获得<payout>15</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Goose: {
    id: 'Goose',
    name: '鹅',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '有<emphasis>1%</emphasis>的几率<emphasis>添加</emphasis>[金蛋](Symbols/Rare/Golden_Egg)'
  },

  Key: {
    id: 'Key',
    name: '钥匙',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[带锁箱](Symbols/Common/Lockbox)[保险箱](Symbols/Uncommon/Safe)[藏宝箱](Symbols/Rare/Treasure_Chest)和[巨大宝箱](Symbols/VeryRare/Mega_Chest)。在之后<emphasis>消除</emphasis>自身。'
  },

  Light_Bulb: {
    id: 'Light_Bulb',
    name: '电灯泡',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[虚空之石](Symbols/Uncommon/Void_Stone)[紫水晶](Symbols/Rare/Amethyst)[珍珠](Symbols/Common/Pearl)[闪亮鹅卵石](Symbols/Common/Shiny_Pebble)[蓝宝石](Symbols/Uncommon/Sapphire)[绿宝石](Symbols/Rare/Emerald)[红宝石](Symbols/Rare/Ruby)和[钻石](Symbols/VeryRare/Diamond)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin),使其他符号给予额外[硬币](Symbols/Common/Coin)<emphasis>5次</emphasis>后,<emphasis>消除</emphasis>自身'
  },

  Lockbox: {
    id: 'Lockbox',
    name: '带锁箱',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后能给予<payout>15</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Magpie: {
    id: 'Magpie',
    name: '喜鹊',
    rarity: 'Common',
    type: 'Symbols',
    payout: -1,
    description: '每<emphasis>4</emphasis>次旋转给予<payout>9</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Milk: {
    id: 'Milk',
    name: '牛奶',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Miner: {
    id: 'Miner',
    name: '旷工',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[矿石](Symbols/Common/Ore)和[巨矿](Symbols/Uncommon/Big_Ore),每<emphasis>消除</emphasis>一个[矿石](Symbols/Common/Ore)和[巨矿](Symbols/Uncommon/Big_Ore),可获得<payout>20</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Monkey: {
    id: 'Monkey',
    name: '猴子',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[香蕉](Symbols/Common/Banana)[椰子](Symbols/Uncommon/Coconut)和[椰子皮](Symbols/Uncommon/Coconut_Half),给予相当于以这种方式<emphasis>消除</emphasis>的符号的价值<emphasis>6倍</emphasis>的[硬币](Symbols/Common/Coin)'
  },

  Mouse: {
    id: 'Mouse',
    name: '老鼠',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[奶酪](Symbols/Common/Cheese),每<emphasis>消除</emphasis>一罐[奶酪](Symbols/Common/Cheese),可获得<payout>20</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Ore: {
    id: 'Ore',
    name: '矿石',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[虚空之石](Symbols/Uncommon/Void_Stone)[紫水晶](Symbols/Rare/Amethyst)[珍珠](Symbols/Common/Pearl)[闪亮鹅卵石](Symbols/Common/Shiny_Pebble)[蓝宝石](Symbols/Uncommon/Sapphire)[绿宝石](Symbols/Rare/Emerald)[红宝石](Symbols/Rare/Ruby)或[钻石](Symbols/VeryRare/Diamond)'
  },

  Owl: {
    id: 'Owl',
    name: '猫头鹰',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '每<emphasis>3</emphasis>次旋转给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Oyster: {
    id: 'Oyster',
    name: '牡蛎',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '有<emphasis>20%</emphasis>的几率<emphasis>添加</emphasis>[珍珠](Symbols/Common/Pearl)。<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[珍珠](Symbols/Common/Pearl)'
  },

  Pearl: {
    id: 'Pearl',
    name: '珍珠',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Present: {
    id: 'Present',
    name: '礼物',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '在<emphasis>12</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后能给予<payout>10</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Seed: {
    id: 'Seed',
    name: '种子',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '有<emphasis>25%</emphasis>的几率长成[虚空水果](Symbols/Uncommon/Void_Fruit)[香蕉](Symbols/Common/Banana)[樱桃](Symbols/Common/Cherry)[椰子](Symbols/Uncommon/Coconut)[花](Symbols/Common/Flower)[梨](Symbols/Rare/Pear)[橙子](Symbols/Uncommon/Orange)[桃子](Symbols/Uncommon/Peach)[苹果](Symbols/Rare/Apple)[草莓](Symbols/Rare/Strawberry)或[西瓜](Symbols/VeryRare/Watermelon)'
  },

  Shiny_Pebble: {
    id: 'Shiny_Pebble',
    name: '闪亮鹅卵石',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '你有额外<emphasis>1.1倍</emphasis>的几率找到<Uncommon>非凡</Uncommon>、<Rare>稀有</Rare>和<VeryRare>非常稀有</VeryRare>符号。'
  },

  Snail: {
    id: 'Snail',
    name: '蜗牛',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '每<emphasis>4</emphasis>次旋转给予<payout>5</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Three_Sided_Die: {
    id: 'Three_Sided_Die',
    name: '三面骰子',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '随机给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)到<payout>3</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Toddler: {
    id: 'Toddler',
    name: '幼儿',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻[礼物](Symbols/Common/Present)[糖果](Symbols/Common/Candy)[彩罐](Symbols/Uncommon/PinFata)和[泡泡](Symbols/Common/Bubble)。每<emphasis>消除</emphasis>一个[礼物](Symbols/Common/Present)[糖果](Symbols/Common/Candy)[彩罐](Symbols/Uncommon/PinFata)和[泡泡](Symbols/Common/Bubble),可获得<payout>6</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Turtle: {
    id: 'Turtle',
    name: '龟',
    rarity: 'Common',
    type: 'Symbols',
    payout: 0,
    description: '每<emphasis>3</emphasis>次旋转给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Urn: {
    id: 'Urn',
    name: '骨灰瓮',
    rarity: 'Common',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[幽灵](Symbols/Rare/Spirit)'
  }
}

// 非凡
const Uncommon = {
  Bar_of_Soap: {
    id: 'Bar_of_Soap',
    name: '肥皂条',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '每次旋转<emphasis>添加</emphasis>[泡泡](Symbols/Common/Bubble),在给予[硬币](Symbols/Common/Coin)<emphasis>3次</emphasis>后<emphasis>消除</emphasis>自身'
  },

  Bear: {
    id: 'Bear',
    name: '熊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[蜂蜜](Symbols/Rare/Honey)。每<emphasis>消除</emphasis>一罐[蜂蜜](Symbols/Rare/Honey),可获得<payout>40</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Big_Ore: {
    id: 'Big_Ore',
    name: '巨矿',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加2颗</emphasis>[虚空之石](Symbols/Uncommon/Void_Stone)[紫水晶](Symbols/Rare/Amethyst)[珍珠](Symbols/Common/Pearl)[闪亮鹅卵石](Symbols/Common/Shiny_Pebble)[蓝宝石](Symbols/Uncommon/Sapphire)[绿宝石](Symbols/Rare/Emerald)[红宝石](Symbols/Rare/Ruby)或[钻石](Symbols/VeryRare/Diamond)'
  },

  Big_Urn: {
    id: 'Big_Urn',
    name: '大骨灰瓮',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加2</emphasis>个[幽灵](Symbols/Rare/Spirit)。'
  },

  Billionaire: {
    id: 'Billionaire',
    name: '亿万富翁',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '相邻的[奶酪](Symbols/Common/Cheese)和[葡萄酒](Symbols/Uncommon/Wine)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)。<emphasis>被消除</emphasis>后能给予<payout>39</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Bronze_Arrow: {
    id: 'Bronze_Arrow',
    name: '铜箭',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '指向随机方向。指向的符号可给予额外<emphasis>2</emphasis>倍[硬币](Symbols/Common/Coin)。<emphasis>消除</emphasis>所指向的[目标](Symbols/Uncommon/Target)。'
  },

  Buffing_Capsule: {
    id: 'Buffing_Capsule',
    name: '增益胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,相邻的符号给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Chemical_Seven: {
    id: 'Chemical_Seven',
    name: '第七种化学品',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身。在<emphasis>被消除</emphasis>时给予7枚[硬币](Symbols/Common/Coin)。并<emphasis>添加1</emphasis>个[未实装:幸运七](Items/Common/Lucky_Seven)物品'
  },

  Chick: {
    id: 'Chick',
    name: '小鸡',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '有<emphasis>10%</emphasis>的几率变成[大鸡](Symbols/Rare/Chicken)'
  },

  Clubs: {
    id: 'Clubs',
    name: '梅花',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[梅花](Symbols/Uncommon/Clubs)和[黑桃](Symbols/Uncommon/Spades)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果有至少<emphasis>3</emphasis>个[梅花](Symbols/Uncommon/Clubs)[方块](Symbols/Uncommon/Diamonds)[红桃](Symbols/Uncommon/Hearts)或[黑桃](Symbols/Uncommon/Spades),则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Coconut: {
    id: 'Coconut',
    name: '椰子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加2</emphasis>个[半个椰子](Symbols/Uncommon/Coconut_Half)。'
  },

  Coconut_Half: {
    id: 'Coconut_Half',
    name: '半个椰子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '给予2枚[硬币](Symbols/Common/Coin)'
  },

  Diamonds: {
    id: 'Diamonds',
    name: '方块',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[方块](Symbols/Uncommon/Diamonds)和[红桃](Symbols/Uncommon/Hearts)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果有至少<emphasis>3</emphasis>个[梅花](Symbols/Uncommon/Clubs)[方块](Symbols/Uncommon/Diamonds)[红桃](Symbols/Uncommon/Hearts)或[黑桃](Symbols/Uncommon/Spades),则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Essence_Capsule: {
    id: 'Essence_Capsule',
    name: '精华胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: -12,
    description: '<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后能给予1枚[未实装:精华代币](Token/Essence_Token)'
  },

  Five_Sided_Die: {
    id: 'Five_Sided_Die',
    name: '五面骰子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '随机给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)到<payout>5</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Golem: {
    id: 'Golem',
    name: '石巨人',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '在<emphasis>5</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后会<emphasis>添加5</emphasis>个[矿石](Symbols/Common/Ore)'
  },

  Hearts: {
    id: 'Hearts',
    name: '红桃',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[方块](Symbols/Uncommon/Diamonds)和[红桃](Symbols/Uncommon/Hearts)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果有至少<emphasis>3</emphasis>个[梅花](Symbols/Uncommon/Clubs)[方块](Symbols/Uncommon/Diamonds)[红桃](Symbols/Uncommon/Hearts)或[黑桃](Symbols/Uncommon/Spades),则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Hex_of_Destruction: {
    id: 'Hex_of_Destruction',
    name: '破坏魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率<emphasis>消除</emphasis>相邻的符号。'
  },

  Hex_of_Draining: {
    id: 'Hex_of_Draining',
    name: '抽吸魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率让相邻的符号给予<payout>0</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Hex_of_Emptiness: {
    id: 'Hex_of_Emptiness',
    name: '空虚魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率迫使你跳过可在旋转后<emphasis>添加</emphasis>的符号'
  },

  Hex_of_Hoarding: {
    id: 'Hex_of_Hoarding',
    name: '囤积魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率迫使你在此次旋转后<emphasis>添加</emphasis>一个符号'
  },

  Hex_of_Midas: {
    id: 'Hex_of_Midas',
    name: '迈达斯魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率<emphasis>添加</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Hex_of_Tedium: {
    id: 'Hex_of_Tedium',
    name: '沉闷魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '找到<Uncommon>非凡</Uncommon>、<Rare>稀有</Rare>和<VeryRare>非常稀有</VeryRare>符号的几率减少1.3倍。'
  },

  Hex_of_Thievery: {
    id: 'Hex_of_Thievery',
    name: '偷窃魔法',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>30%</emphasis>的几率拿走<payout>6</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Hooligan: {
    id: 'Hooligan',
    name: '流氓',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[骨灰瓮](Symbols/Common/Urn)[大骨灰瓮](Symbols/Uncommon/Big_Urn)和[坟墓](Symbols/Rare/Tomb),每<emphasis>消除</emphasis>一个[骨灰瓮](Symbols/Common/Urn)[大骨灰瓮](Symbols/Uncommon/Big_Urn)和[坟墓](Symbols/Rare/Tomb),可获得<payout>6</payout>[硬币](Symbols/Common/Coin)'
  },

  Hustling_Capsule: {
    id: 'Hustling_Capsule',
    name: '诈骗胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: -7,
    description: '<emphasis>消除</emphasis>自身,在<emphasis>被消除</emphasis>时给<emphasis>添加1</emphasis>个[未实装:台球](Items/Common/Pool_Ball)物品'
  },

  Item_Capsule: {
    id: 'Item_Capsule',
    name: '物品胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,在<emphasis>被消除</emphasis>时给<emphasis>添加1</emphasis>个<Common>普通</Common>物品'
  },

  Jellyfish: {
    id: 'Jellyfish',
    name: '水母',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '在<emphasis>被消除</emphasis>时给予1枚[未实装:移除代币](Token/Removal_Token)。'
  },

  Lucky_Capsule: {
    id: 'Lucky_Capsule',
    name: '幸运胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,只是<emphasis>1</emphasis>个要在此旋转后<emphasis>添加</emphasis>的符号会变成<Rare>稀有</Rare>或更好的符号'
  },

  Matryoshka_Doll: {
    id: 'Matryoshka_Doll',
    name: '俄罗斯套娃',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '在<emphasis>3</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[俄罗斯套娃2](Symbols/Special/Matryoshka_Doll_2)'
  },

  Ninja: {
    id: 'Ninja',
    name: '忍者',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '将为<emphasis>每位</emphasis>[忍者](Symbols/Uncommon/Ninja)给予的[硬币](Symbols/Common/Coin)减少<payout>1</payout>枚'
  },

  Orange: {
    id: 'Orange',
    name: '橙子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '给予<payout>2</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Peach: {
    id: 'Peach',
    name: '桃子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[种子](Symbols/Common/Seed)。'
  },

  PinFata: {
    id: 'PinFata',
    name: '彩罐',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后会<emphasis>添加7</emphasis>个[糖果](Symbols/Common/Candy)。'
  },

  Pufferfish: {
    id: 'Pufferfish',
    name: '河豚',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '在<emphasis>被消除</emphasis>时给予1枚[未实装:重掷代币](???)。'
  },

  Rabbit: {
    id: 'Rabbit',
    name: '兔子',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '在给予[硬币](Symbols/Common/Coin)<emphasis>10次</emphasis>后,永久给予额外<payout>2</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Rabbit_Fluff: {
    id: 'Rabbit_Fluff',
    name: '兔毛',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '你有额外<emphasis>1.2倍</emphasis>的几率找到<Uncommon>非凡</Uncommon>、<Rare>稀有</Rare>和<VeryRare>非常稀有</VeryRare>符号。'
  },

  Rain: {
    id: 'Rain',
    name: '雨',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[花](Symbols/Common/Flower)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin),相邻的[种子](Symbols/Common/Seed)有额外<emphasis>50%</emphasis>的几率生长'
  },

  Removal_Capsule: {
    id: 'Removal_Capsule',
    name: '移除胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后能给予1枚[未实装:移除代币](Token/Removal_Token)'
  },

  Reroll_Capsule: {
    id: 'Removal_Capsule',
    name: '重掷胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后能给予1枚[未实装:重掷代币](Token/Reroll_Token)'
  },

  Safe: {
    id: 'Safe',
    name: '保险箱',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>被消除</emphasis>后能给予<payout>30</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Sand_Dollar: {
    id: 'Sand_Dollar',
    name: '沙钱',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后能给予<payout>10</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Sapphire: {
    id: 'Sapphire',
    name: '蓝宝石',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '给予<payout>2</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Sloth: {
    id: 'Sloth',
    name: '树懒',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '每<emphasis>2</emphasis>次旋转给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Spades: {
    id: 'Spades',
    name: '黑桃',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 1,
    description: '相邻的[梅花](Symbols/Uncommon/Clubs)和[黑桃](Symbols/Uncommon/Spades)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果有至少<emphasis>3</emphasis>个[梅花](Symbols/Uncommon/Clubs)[方块](Symbols/Uncommon/Diamonds)[红桃](Symbols/Uncommon/Hearts)或[黑桃](Symbols/Uncommon/Spades),则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Target: {
    id: 'Target',
    name: '目标',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后给予<payout>10</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Tedium_Capsule: {
    id: 'Tedium_Capsule',
    name: '沉闷胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后能给予<payout>5</payout>枚[硬币](Symbols/Common/Coin),至少<emphasis>1</emphasis>个要在此旋转后<emphasis>添加</emphasis>的符号会变成<Common>普通</Common>符号'
  },

  Thief: {
    id: 'Thief',
    name: '小偷',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: -1,
    description: '<emphasis>被消除</emphasis>后给予<payout>?</payout>枚[硬币](Symbols/Common/Coin)。每次旋转“<payout>?</payout>枚”增加<payout>4</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Time_Capsule: {
    id: 'Time_Capsule',
    name: '时间胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身,被<emphasis>消除</emphasis>时,<emphasis>添加1个</emphasis>本次游戏中已<emphasis>消除</emphasis>的符号,不可添加[时间胶囊](Symbols/Uncommon/Time_Capsule)'
  },

  Void_Creature: {
    id: 'Void_Creature',
    name: '虚空生物',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '相邻的[空](Symbols/Special/Empty)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果和<emphasis>0</emphasis>个[空](Symbols/Special/Empty)相邻，则会消<emphasis>消除</emphasis>自身。<emphasis>被消除</emphasis>后能给予<payout>8</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Void_Fruit: {
    id: 'Void_Fruit',
    name: '虚空水果',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '相邻的[空](Symbols/Special/Empty)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果和<emphasis>0</emphasis>个[空](Symbols/Special/Empty)相邻，则会消<emphasis>消除</emphasis>自身。<emphasis>被消除</emphasis>后能给予<payout>8</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Void_Stone: {
    id: 'Void_Stone',
    name: '虚空之石',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '相邻的[空](Symbols/Special/Empty)额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。如果和<emphasis>0</emphasis>个[空](Symbols/Special/Empty)相邻，则会消<emphasis>消除</emphasis>自身。<emphasis>被消除</emphasis>后能给予<payout>8</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Wealthy_Capsule: {
    id: 'Wealthy_Capsule',
    name: '财富胶囊',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身。<emphasis>被消除</emphasis>后能给予<payout>10</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Wine: {
    id: 'Wine',
    name: '葡萄酒',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '在给予[硬币](Symbols/Common/Coin)<emphasis>8次</emphasis>后，永久给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Wolf: {
    id: 'Wolf',
    name: '狼',
    rarity: 'Uncommon',
    type: 'Symbols',
    payout: 2,
    description: '给予<payout>2</payout>枚[硬币](Symbols/Common/Coin)'
  }
}

// 稀有
const Rare = {
  Amethyst: {
    id: 'Amethyst',
    name: '紫水晶',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 1,
    description: '每当另一个符号使此符号给予额外的[硬币](Symbols/Common/Coin)。此符号会永久给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Apple: {
    id: 'Apple',
    name: '苹果',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '给予<payout>3</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Bartender: {
    id: 'Bartender',
    name: '酒保',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>10%</emphasis>的几率<emphasis>添加</emphasis>[第七种化学品](Symbols/Unommon/Chemical_Seven)[啤酒](Symbols/Common/Beer)[葡萄酒](Symbols/Uncommon/Wine)或[马提尼酒](Symbols/Rare/Martini)'
  },

  Beastmaster: {
    id: 'Beastmaster',
    name: '驯兽师',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[喜鹊](Symbols/Common/Magpie)[虚空生物](Symbols/Uncommon/Void_Creature)[龟](Symbols/Common/Turtle)[蜗牛](Symbols/Common/Snail)[树懒](Symbols/Uncommon/Sloth)[牡蛎](Symbols/Common/Oyster)[猫头鹰](Symbols/Common/Owl)[老鼠](Symbols/Common/Mouse)[猴子](Symbols/Common/Monkey)[兔子](Symbols/Uncommon/Rabbit)[鹅](Symbols/Common/Goose)[金鱼](Symbols/Common/Goldfish)[狗狗](Symbols/Common/Dog)[螃蟹](Symbols/Common/Crab)[小鸡](Symbols/Uncommon/Chick)[猫咪](Symbols/Common/Cat)[蜜蜂](Symbols/Common/Bee)[沙钱](Symbols/Uncommon/Sand_Dollar)[狼](Symbols/Uncommon/Wolf)[河豚](Symbols/Uncommon/Pufferfish)[水母](Symbols/Uncommon/Jellyfish)[鸽子](Symbols/Rare/Dove)[乌鸦](Symbols/Common/Crow)[大鸡](Symbols/Rare/Chicken)[熊](Symbols/Uncommon/Bear)[牛](Symbols/Rare/Cow)和[怪异生物](Symbols/VeryRare/Eldritch_Creature)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Beehive: {
    id: 'Beehive',
    name: '蜂巢',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>10%</emphasis>的几率<emphasis>添加</emphasis>[蜂蜜](Symbols/Rare/Honey)'
  },

  Card_Shark: {
    id: 'Card_Shark',
    name: '纸牌高手',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '相邻的[梅花](Symbols/Uncommon/Clubs)[黑桃](Symbols/Uncommon/Spades)[方块](Symbols/Uncommon/Diamonds)和[红桃](Symbols/Uncommon/Hearts)是[通配符](Symbols/VeryRare/Wildcard)。'
  },

  Chef: {
    id: 'Chef',
    name: '厨师',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[第七种化学品](Symbols/Uncommon/Chemical_Seven)[虚空水果](Symbols/Uncommon/Void_Fruit)[香蕉](Symbols/Common/Banana)[啤酒](Symbols/Common/Beer)[糖果](Symbols/Common/Candy)[奶酪](Symbols/Common/Cheese)[樱桃](Symbols/Common/Cherry)[蛋](Symbols/Common/Egg)[梨](Symbols/Rare/Pear)[牛奶](Symbols/Common/Milk)[葡萄酒](Symbols/Uncommon/Wine)[椰子皮](Symbols/Uncommon/Coconut_Half)[橙子](Symbols/Uncommon/Orange)[桃子](Symbols/Uncommon/Peach)[草莓](Symbols/Rare/Strawberry)[煎蛋卷](Symbols/Rare/Omelette)[马提尼酒](Symbols/Rare/Martini)[蜂蜜](Symbols/Rare/Honey)[苹果](Symbols/Rare/Apple)[金蛋](Symbols/Rare/Golden_Egg)和[西瓜](Symbols/VeryRare/Watermelon)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Chicken: {
    id: 'Chicken',
    name: '大鸡',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '有<emphasis>5%</emphasis>的几率<emphasis>添加</emphasis>[蛋](Symbols/Common/Egg),有<emphasis>1%</emphasis>的几率<emphasis>添加</emphasis>[金蛋](Symbols/Rare/Golden_Egg),'
  },

  Comedian: {
    id: 'Comedian',
    name: '喜剧演员',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '相邻的[香蕉](Symbols/Common/Banana)[香蕉皮](Symbols/Common/Banana_Peel)[狗狗](Symbols/Common/Dog)[猴子](Symbols/Common/Monkey)[幼儿](Symbols/Common/Toddler)和[小丑](Symbols/Rare/Joker)能给予额外<emphasis>3倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Cow: {
    id: 'Cow',
    name: '牛',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>15%</emphasis>的几率<emphasis>添加</emphasis>[牛奶](Symbols/Common/Milk)'
  },

  Dame: {
    id: 'Dame',
    name: '贵妇',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[虚空之石](Symbols/Uncommon/Void_Stone)[紫水晶](Symbols/Rare/Amethyst)[珍珠](Symbols/Common/Pearl)[闪亮鹅卵石](Symbols/Common/Shiny_Pebble)[蓝宝石](Symbols/Uncommon/Sapphire)[绿宝石](Symbols/Rare/Emerald)[红宝石](Symbols/Rare/Ruby)和[钻石](Symbols/VeryRare/Diamond)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin),<emphasis>消除</emphasis>相邻的[马提尼酒](Symbols/Rare/Martini),每<emphasis>消除</emphasis>一罐[马提尼酒](Symbols/Rare/Martini),可以获得<payout>40</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Diver: {
    id: 'Diver',
    name: '潜水员',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[蜗牛](Symbols/Common/Snail)[龟](Symbols/Common/Turtle)[锚](Symbols/Common/Anchor)[螃蟹](Symbols/Common/Crab)[金鱼](Symbols/Common/Goldfish)[牡蛎](Symbols/Common/Oyster)[珍珠](Symbols/Common/Pearl)[水母](Symbols/Uncommon/Jellyfish)[河豚](Symbols/Uncommon/Pufferfish)和[沙钱](Symbols/Uncommon/Sand_Dollar)。每<emphasis>消除</emphasis>一个符号，永久给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Dove: {
    id: 'Dove',
    name: '鸽子',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '如果一个相邻的符号本会<emphasis>被消除</emphasis>,则该符号不会被消除,而且该符号会永久提供额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Emerald: {
    id: 'Emerald',
    name: '绿宝石',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '如果有至少<emphasis>2</emphasis>个[绿宝石](Symbols/Rare/Emerald)，则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Farmer: {
    id: 'Farmer',
    name: '农夫',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[虚空水果](Symbols/Uncommon/Void_Fruit)[香蕉](Symbols/Common/Banana)[奶酪](Symbols/Common/Cheese)[樱桃](Symbols/Common/Cherry)[小鸡](Symbols/Uncommon/Chick)[椰子](Symbols/Uncommon/Coconut)[蛋](Symbols/Common/Egg)[花](Symbols/Common/Flower)[种子](Symbols/Common/Seed)[牛奶](Symbols/Common/Milk)[梨](Symbols/Rare/Pear)[大鸡](Symbols/Rare/Chicken)[橙子](Symbols/Uncommon/Orange)[桃子](Symbols/Uncommon/Peach)[草莓](Symbols/Rare/Strawberry)[牛](Symbols/Rare/Cow)[苹果](Symbols/Rare/Apple)[金蛋](Symbols/Rare/Golden_Egg)和[西瓜](Symbols/VeryRare/Watermelon)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin),相邻的[种子](Symbols/Common/Seed)有额外<emphasis>50%</emphasis>的几率生长'
  },

  Frozen_Fossil: {
    id: 'Frozen_Fossil',
    name: '冰冻化石',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 0,
    description: '在<emphasis>20</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>消除</emphasis>或<emphasis>移除</emphasis>每个[异教徒](Symbols/Common/Cultist)[女巫](Symbols/Rare/Witch)[破坏魔法](Symbols/Uncommon/Hex_of_Destruction)[抽吸魔法](Symbols/Uncommon/Hex_of_Draining)[空虚魔法](Symbols/Uncommon/Hex_of_Emptiness)[囤积魔法](Symbols/Uncommon/Hex_of_Hoarding)[迈达斯魔法](Symbols/Uncommon/Hex_of_Midas)[沉闷魔法](Symbols/Uncommon/Hex_of_Tedium)和[偷窃魔法](Symbols/Uncommon/Hex_of_Thievery)所需要的旋转次数减少<emphasis>5</emphasis>次,<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[怪异生物](Symbols/VeryRare/Eldritch_Creature)'
  },

  General_Zaroff: {
    id: 'General_Zaroff',
    name: '扎罗夫将军',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 1,
    description: '<emphasis>消除</emphasis>相邻的[罗宾汉](Symbols/Rare/Robin_Hood)[小偷](Symbols/Uncommon/Thief)[亿万富翁](Symbols/Uncommon/Billionaire)[异教徒](Symbols/Common/Cultist)[幼儿](Symbols/Common/Toddler)[赏金猎人](Symbols/Common/Bounty_Hunter)[旷工](Symbols/Common/Miner)[矮人](Symbols/Common/Dwarf)[迈达斯国王](Symbols/Rare/King_Midas)[赌徒](Symbols/Common/Gambler)[扎罗夫将军](Symbols/Rare/General_Zaroff)[女巫](Symbols/Rare/Witch)[海盗](Symbols/VeryRare/Pirate)[忍者](Symbols/Uncommon/Ninja)[弗鲁特女士](Symbols/Rare/Mrs_Fruit)[流氓](Symbols/Uncommon/Hooligan)[农夫](Symbols/Rare/Farmer)[潜水员](Symbols/Rare/Diver)[贵妇](Symbols/Rare/Dame)[厨师](Symbols/Rare/Chef)[驯兽师](Symbols/Rare/Beastmaster)[地质学家](Symbols/Rare/Geologist)[小丑](Symbols/Rare/Joker)[喜剧演员](Symbols/Rare/Comedian)[纸牌高手](Symbols/Rare/Card_Shark)和[酒保](Symbols/Rare/Bartender),每<emphasis>消除</emphasis>一个符号,给予<payout>25</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Geologist: {
    id: 'Geologist',
    name: '地质学家',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[矿石](Symbols/Common/Ore)[珍珠](Symbols/Common/Pearl)[闪亮鹅卵石](Symbols/Common/Shiny_Pebble)[巨矿](Symbols/Uncommon/Big_Ore)和[蓝宝石](Symbols/Uncommon/Sapphire),每<emphasis>消除</emphasis>一个符号,永久给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Golden_Egg: {
    id: 'Golden_Egg',
    name: '金蛋',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 4,
    description: '给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Honey: {
    id: 'Honey',
    name: '蜂蜜',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '给予<payout>3</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Joker: {
    id: 'Joker',
    name: '小丑',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '相邻的[梅花](Symbols/Uncommon/Clubs)[黑桃](Symbols/Uncommon/Spades)[方块](Symbols/Uncommon/Diamonds)和[红桃](Symbols/Uncommon/Hearts)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  King_Midas: {
    id: 'King_Midas',
    name: '迈达斯国王',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 1,
    description: '每次旋转<emphasis>添加</emphasis>[硬币](Symbols/Common/Coin),相邻的[硬币](Symbols/Common/Coin)能给予额外<emphasis>3倍</emphasis>[硬币](Symbols/Common/Coin)'
  },

  Magic_Key: {
    id: 'Magic_Key',
    name: '魔法钥匙',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[带锁箱](Symbols/Common/Lockbox)[保险箱](Symbols/Uncommon/Safe)[藏宝箱](Symbols/Rare/Treasure_Chest)和[巨大宝箱](Symbols/VeryRare/Mega_Chest)。这样<emphasis>消除</emphasis>的符号能给予额外<emphasis>3倍</emphasis>[硬币](Symbols/Common/Coin),在之后<emphasis>消除</emphasis>自身。'
  },

  Martini: {
    id: 'Martini',
    name: '马提尼酒',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '给予<payout>3</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Mine: {
    id: 'Mine',
    name: '矿井',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 4,
    description: '每次旋转<emphasis>添加</emphasis>[矿石](Symbols/Common/Ore),在给予[硬币](Symbols/Common/Coin)<emphasis>4次</emphasis>后<emphasis>消除</emphasis>自身,在<emphasis>被消除</emphasis>时<emphasis>添加1</emphasis>个[未实装:矿稿](Items/Common/Mining_Pick)物品'
  },

  Moon: {
    id: 'Moon',
    name: '月亮',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '相邻的[猫头鹰](Symbols/Common/Owl)[兔子](Symbols/Uncommon/Rabbit)和[狼](Symbols/Uncommon/Wolf)能给予额外<emphasis>3倍</emphasis>[硬币](Symbols/Common/Coin),<emphasis>被消除</emphasis>后会<emphasis>添加3</emphasis>个[奶酪](Symbols/Common/Cheese)'
  },

  Mrs_Fruit: {
    id: 'Mrs_Fruit',
    name: '弗鲁特女士',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[香蕉](Symbols/Common/Banana)[樱桃](Symbols/Common/Cherry)[椰子](Symbols/Uncommon/Coconut)[椰子皮](Symbols/Uncommon/Coconut_Half)[橙子](Symbols/Uncommon/Orange)和[桃子](Symbols/Uncommon/Peach).每消除一个符号,永久给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Omelette: {
    id: 'Omelette',
    name: '煎蛋卷',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '如果与[奶酪](Symbols/Common/Cheese)[蛋](Symbols/Common/Egg)[牛奶](Symbols/Common/Milk)[煎蛋卷](Symbols/Rare/Omelette)或[金蛋](Symbols/Rare/Golden_Egg)相邻,则额外给予<payout>2</payout>枚[硬币](Symbols/Common/Coin),该效果每次旋转仅适用一次'
  },

  Pear: {
    id: 'Pear',
    name: '梨',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 1,
    description: '每当另一个符号使此符号给予额外的[硬币](Symbols/Common/Coin)。此符号会永久给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Robin_Hood: {
    id: 'Robin_Hood',
    name: '罗宾汉',
    rarity: 'Rare',
    type: 'Symbols',
    payout: -4,
    description: '每<emphasis>4</emphasis>次旋转给予<payout>25</payout>枚[硬币](Symbols/Common/Coin).相邻的[小偷](Symbols/Uncommon/Thief)[箭](Symbols/Uncommon/Bronze_Arrow)[金箭](Symbols/VeryRare/Golden_Arrow)和[银箭](Symbols/Rare/Silver_Arrow)额外给予<payout>3</payout>枚[硬币](Symbols/Common/Coin)。<emphasis>消除</emphasis>相邻的[亿万富翁](Symbols/Uncommon/Billionaire)[目标](Symbols/Uncommon/Target)和[苹果](Symbols/Rare/Apple)。每<emphasis>消除</emphasis>一个[亿万富翁](Symbols/Uncommon/Billionaire)[目标](Symbols/Uncommon/Target)和[苹果](Symbols/Rare/Apple)。可获得<payout>15</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Ruby: {
    id: 'Ruby',
    name: '红宝石',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '如果有至少<emphasis>2</emphasis>个[红宝石](Symbols/Rare/Ruby)，则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Silver_Arrow: {
    id: 'Silver_Arrow',
    name: '银箭',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 0,
    description: '指向随机方向。指向的符号可给予额外<emphasis>3</emphasis>倍[硬币](Symbols/Common/Coin)。<emphasis>消除</emphasis>所指向的[目标](Symbols/Uncommon/Target)。'
  },

  Spirit: {
    id: 'Spirit',
    name: '幽灵',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 6,
    description: '在给予[硬币](Symbols/Common/Coin)<emphasis>4次</emphasis>后<emphasis>消除</emphasis>自身。'
  },

  Strawberry: {
    id: 'Strawberry',
    name: '草莓',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '如果有至少<emphasis>2</emphasis>个[草莓](Symbols/Rare/Strawberry)，则额外给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)。'
  },

  Sun: {
    id: 'Sun',
    name: '太阳',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '相邻的[花](Symbols/Common/Flower)能给予额外<emphasis>5倍</emphasis>[硬币](Symbols/Common/Coin),相邻的[种子](Symbols/Common/Seed)有额外<emphasis>50%</emphasis>的几率生长'
  },

  Tomb: {
    id: 'Tomb',
    name: '坟墓',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 3,
    description: '有<emphasis>6%</emphasis>的几率<emphasis>添加</emphasis>[幽灵](Symbols/Rare/Spirit),<emphasis>被消除</emphasis>后会<emphasis>添加4</emphasis>个[幽灵](Symbols/Rare/Spirit)'
  },

  Treasure_Chest: {
    id: 'Treasure_Chest',
    name: '藏宝箱',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>被消除</emphasis>后能给予<payout>50</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Witch: {
    id: 'Witch',
    name: '女巫',
    rarity: 'Rare',
    type: 'Symbols',
    payout: 2,
    description: '相邻的[猫咪](Symbols/Common/Cat)[猫头鹰](Symbols/Common/Owl)[乌鸦](Symbols/Common/Crow)[苹果](Symbols/Rare/Apple)[破坏魔法](Symbols/Uncommon/Hex_of_Destruction)[抽吸魔法](Symbols/Uncommon/Hex_of_Draining)[空虚魔法](Symbols/Uncommon/Hex_of_Emptiness)[囤积魔法](Symbols/Uncommon/Hex_of_Hoarding)[迈达斯魔法](Symbols/Uncommon/Hex_of_Midas)[沉闷魔法](Symbols/Uncommon/Hex_of_Tedium)[偷窃魔法](Symbols/Uncommon/Hex_of_Thievery)[怪异生物](Symbols/VeryRare/Eldritch_Creature)和[幽灵](Symbols/Rare/Spirit)能给予额外<emphasis>2倍</emphasis>[硬币](Symbols/Common/Coin)'
  }
}

// 非常稀有
const VeryRare = {
  Diamond: {
    id: 'Diamond',
    name: '钻石',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 5,
    description: '为<emphasis>每位</emphasis>[钻石](Symbols/VeryRare/Diamond)给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Eldritch_Creature: {
    id: 'Eldritch_Creature',
    name: '怪异生物',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 4,
    description: '<emphasis>消除</emphasis>相邻的[异教徒](Symbols/Common/Cultist)[女巫](Symbols/Rare/Witch)[破坏魔法](Symbols/Uncommon/Hex_of_Destruction)[抽吸魔法](Symbols/Uncommon/Hex_of_Draining)[空虚魔法](Symbols/Uncommon/Hex_of_Emptiness)[囤积魔法](Symbols/Uncommon/Hex_of_Hoarding)[迈达斯魔法](Symbols/Uncommon/Hex_of_Midas)[沉闷魔法](Symbols/Uncommon/Hex_of_Tedium)和[偷窃魔法](Symbols/Uncommon/Hex_of_Thievery),每<emphasis>消除</emphasis>或<emphasis>移除</emphasis>一个[异教徒](Symbols/Common/Cultist)[女巫](Symbols/Rare/Witch)[破坏魔法](Symbols/Uncommon/Hex_of_Destruction)[抽吸魔法](Symbols/Uncommon/Hex_of_Draining)[空虚魔法](Symbols/Uncommon/Hex_of_Emptiness)[囤积魔法](Symbols/Uncommon/Hex_of_Hoarding)[迈达斯魔法](Symbols/Uncommon/Hex_of_Midas)[沉闷魔法](Symbols/Uncommon/Hex_of_Tedium)和[偷窃魔法](Symbols/Uncommon/Hex_of_Thievery)给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Golden_Arrow: {
    id: 'Golden_Arrow',
    name: '金箭',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 0,
    description: '指向随机方向。指向的符号可给予额外<emphasis>4</emphasis>倍[硬币](Symbols/Common/Coin)。<emphasis>消除</emphasis>所指向的[目标](Symbols/Uncommon/Target)。'
  },

  Highlander: {
    id: 'Highlander',
    name: '高地剑',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 6,
    description: '只能拥有<emphasis>1</emphasis>把[高地剑](Symbols/VeryRare/Highlander)'
  },

  Mega_Chest: {
    id: 'Mega_Chest',
    name: '巨大宝箱',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 3,
    description: '<emphasis>被消除</emphasis>后能给予<payout>100</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Midas_Bomb: {
    id: 'Midas_Bomb',
    name: '迈达斯炸弹',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 0,
    description: '<emphasis>消除</emphasis>自身和所有相邻的符号,以这种方式<emphasis>被消除</emphasis>的符号能给予相当于其价值<emphasis>7倍</emphasis>的[硬币](Symbols/Common/Coin)'
  },

  Pirate: {
    id: 'Pirate',
    name: '海盗',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 2,
    description: '<emphasis>消除</emphasis>相邻的[锚](Symbols/Common/Anchor)[啤酒](Symbols/Common/Beer)[硬币](Symbols/Common/Coin)[带锁箱](Symbols/Common/Lockbox)[保险箱](Symbols/Uncommon/Safe)[橙子](Symbols/Uncommon/Orange)[藏宝箱](Symbols/Rare/Treasure_Chest)和[巨大宝箱](Symbols/VeryRare/Mega_Chest),每<emphasis>消除</emphasis>一个符号,永久给予<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Watermelon: {
    id: 'Watermelon',
    name: '西瓜',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 4,
    description: '为<emphasis>每位</emphasis>[西瓜](Symbols/VeryRare/Watermelon)给予额外<payout>1</payout>枚[硬币](Symbols/Common/Coin)'
  },

  Wildcard: {
    id: 'Wildcard',
    name: '通配符',
    rarity: 'VeryRare',
    type: 'Symbols',
    payout: 0,
    description: '给予相当于相邻符号中最高价值的[硬币](Symbols/Common/Coin)。'
  }
}

const Special = {
  Matryoshka_Doll_2: {
    id: 'Matryoshka_Doll_2',
    name: '俄罗斯套娃',
    rarity: 'Special',
    type: 'Symbols',
    payout: 2,
    description: '在<emphasis>5</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[俄罗斯套娃3](Symbols/Uncommon/Matryoshka_Doll_3)'
  },
  Matryoshka_Doll_3: {
    id: 'Matryoshka_Doll_3',
    name: '俄罗斯套娃',
    rarity: 'Special',
    type: 'Symbols',
    payout: 2,
    description: '在<emphasis>7</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[俄罗斯套娃4](Symbols/Uncommon/Matryoshka_Doll_4)'
  },
  Matryoshka_Doll_4: {
    id: 'Matryoshka_Doll_4',
    name: '俄罗斯套娃',
    rarity: 'Special',
    type: 'Symbols',
    payout: 3,
    description: '在<emphasis>9</emphasis>次旋转后<emphasis>消除</emphasis>自身,<emphasis>被消除</emphasis>后会<emphasis>添加</emphasis>[俄罗斯套娃5](Symbols/Uncommon/Matryoshka_Doll_5)'
  },
  Matryoshka_Doll_5: {
    id: 'Matryoshka_Doll_5',
    name: '俄罗斯套娃',
    rarity: 'Special',
    type: 'Symbols',
    payout: 4,
    description: '给予<payout>4</payout>枚[硬币](Symbols/Common/Coin)'
  },
  Empty: {
    id: 'Empty',
    name: '空',
    rarity: 'Special',
    type: 'Symbols',
    payout: 0,
    description: ''
  }
}

const nameToSymbol = {}

for (const i of [Common, Uncommon, Rare, VeryRare]) {
  Object.keys(i).reduce((acc, key) => {
    const item = i[key]
    acc[item.name] = item
    return acc
  }, nameToSymbol)
}

export default { Common, Uncommon, Rare, VeryRare, Special, nameToSymbol }
