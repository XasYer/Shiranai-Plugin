import Model from './core/Model.js'
import Control from './core/Control.js'

export default class Popstar {
  constructor (user_id) {
    this.user_id = user_id
    // mvc 初始化
    this.model = new Model()
    // mv 由于 c 控制
    this.constrol = new Control(
      this.model,
      0
    )
    // 挂载 event
    this.event = this.constrol.event
    // 总得分
    Reflect.defineProperty(
      this,
      'total',
      {
        get: () => this.constrol.total,
        set: value => {
          this.constrol.total = value
        }
      }
    )
    // 当前关卡 ---- 只读
    Reflect.defineProperty(
      this,
      'level',
      {
        get: () => this.constrol.curLevel
      }
    )
  }

  // 开始游戏
  enter (level) {
    this.constrol.enter(level)
  }

  // 下一关
  next () {
    this.constrol.next()
  }
}
