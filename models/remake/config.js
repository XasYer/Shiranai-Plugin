import { Config } from '../../components/index.js'

export default () => ({
  defaultPropertyPoints: Config.remake.defaultPropertyPoints,
  talentSelectLimit: Config.remake.talentSelectLimit,
  propertyAllocateLimit: [Config.remake.propertyAllocateLimit.min, Config.remake.propertyAllocateLimit.max],
  defaultPropertys: Config.remake.defaultPropertys,
  talentConfig: {
    ...Config.remake.talentConfig,
    talentRate: { 1: 100, 2: 10, 3: 1, total: 1000 },
    additions: {
      TMS: [
        [10, { 2: 1 }],
        [30, { 2: 2 }],
        [50, { 2: 3 }],
        [70, { 2: 4 }],
        [100, { 2: 5 }]
      ],
      CACHV: [
        [10, { 2: 1 }],
        [30, { 2: 2 }],
        [50, { 2: 3 }],
        [70, { 2: 4 }],
        [100, { 2: 5 }]
      ]
    }
  },
  propertyConfig: {
    judge: {
      // type: [min, grade, judge]
      RTLT: [
        [0, 0],
        [0.3, 1],
        [0.6, 2],
        [0.9, 3]
      ],
      REVT: [
        [0, 0],
        [0.2, 1],
        [0.4, 2],
        [0.6, 3]
      ],
      TMS: [
        [0, 0, '抽到紫色概率不变'],
        [10, 1, '抽到紫色概率翻倍'],
        [30, 1, '抽到紫色概率三倍'],
        [50, 2, '抽到紫色概率四倍'],
        [70, 2, '抽到紫色概率五倍'],
        [100, 3, '抽到紫色概率六倍']
      ],
      CACHV: [
        [0, 0, '抽到橙色概率不变'],
        [10, 1, '抽到橙色概率翻倍'],
        [30, 1, '抽到橙色概率三倍'],
        [50, 2, '抽到橙色概率四倍'],
        [70, 2, '抽到橙色概率五倍'],
        [100, 3, '抽到橙色概率六倍']
      ],
      HCHR: [
        [0, 0, '地狱'],
        [1, 0, '折磨'],
        [2, 0, '不佳'],
        [4, 0, '普通'],
        [7, 1, '优秀'],
        [9, 2, '罕见'],
        [11, 3, '逆天']
      ],
      HMNY: [
        [0, 0, '地狱'],
        [1, 0, '折磨'],
        [2, 0, '不佳'],
        [4, 0, '普通'],
        [7, 1, '优秀'],
        [9, 2, '罕见'],
        [11, 3, '逆天']
      ],
      HSPR: [
        [0, 0, '地狱'],
        [1, 0, '折磨'],
        [2, 0, '不幸'],
        [4, 0, '普通'],
        [7, 1, '幸福'],
        [9, 2, '极乐'],
        [11, 3, '天命']
      ],
      HINT: [
        [0, 0, '地狱'],
        [1, 0, '折磨'],
        [2, 0, '不佳'],
        [4, 0, '普通'],
        [7, 1, '优秀'],
        [9, 2, '罕见'],
        [11, 3, '逆天'],
        [21, 3, '识海'],
        [131, 3, '元神'],
        [501, 3, '仙魂']
      ],
      HSTR: [
        [0, 0, '地狱'],
        [1, 0, '折磨'],
        [2, 0, '不佳'],
        [4, 0, '普通'],
        [7, 1, '优秀'],
        [9, 2, '罕见'],
        [11, 3, '逆天'],
        [21, 3, '凝气'],
        [101, 3, '筑基'],
        [401, 3, '金丹'],
        [1001, 3, '元婴'],
        [2001, 3, '仙体']
      ],
      HAGE: [
        [0, 0, '胎死腹中'],
        [1, 0, '早夭'],
        [10, 0, '少年'],
        [18, 0, '盛年'],
        [40, 0, '中年'],
        [60, 1, '花甲'],
        [70, 1, '古稀'],
        [80, 2, '杖朝'],
        [90, 2, '南山'],
        [95, 3, '不老'],
        [100, 3, '修仙'],
        [500, 3, '仙寿']
      ],
      SUM: [
        [0, 0, '地狱'],
        [41, 0, '折磨'],
        [50, 0, '不佳'],
        [60, 0, '普通'],
        [80, 1, '优秀'],
        [100, 2, '罕见'],
        [110, 3, '逆天'],
        [120, 3, '传说']
      ]
    }
  },
  characterConfig: { // config for character
    characterPullCount: 3,
    rateableKnife: 10,
    propertyWeight: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 5],
      [7, 4],
      [8, 3],
      [9, 2],
      [10, 1]
    ],
    talentWeight: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 2],
      [5, 1]
    ]
  }
})
