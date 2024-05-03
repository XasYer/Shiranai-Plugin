import Event from '../lib/Event.js'

export default class Constrol {
  constructor (model, view, total = 0) {
    this.model = model

    // event 事件
    this.event = new Event()

    // 当前关卡
    Object.defineProperties(
      this,
      {
        curLevel: {
          get: () => this._curLevel || 0,
          set: value => {
            this._curLevel = value || 0
          }
        },
        goal: {
          get: () => this._goal || 0,
          set: value => {
            this._goal = value || 0
          }
        }
      }
    )

    // 当前分数
    this.total = total
  }

  // 初关卡
  init () {
    // 默认五个颜色
    this.model.init()
  }

  // 指定关数
  enter (level = 0) {
    this.curLevel = level || 0
    // 目标分数
    this.goal = level * 2000 + 1000
    // 初始化关卡
    this.init()
  }

  // 下一关
  next () {
    this.enter(this.curLevel + 1)
  }
}
