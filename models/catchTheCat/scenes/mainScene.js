import Cat from '../sprites/cat.js'
import Block from '../sprites/block.js'
import { restoreNumberToLetter } from '#models'
import nearestSolver from '../solvers/nearestSolver.js'

const GameState = {
  PLAYING: 'playing',
  WIN: 'win',
  LOSE: 'lose'
}

export default class MainScene {
  constructor (w, h, initialWallCount) {
    this.w = w
    this.h = h
    this.initialWallCount = initialWallCount
    this.datas = {}
    this.data = {
      get: (key) => {
        return this.datas[key]
      },
      set: (key, value) => {
        this.datas[key] = value
      }
    }
  }

  get blocks () {
    return this.data.get('blocks')
  }

  set blocks (value) {
    this.data.set('blocks', value)
  }

  get blocksData () {
    const result = []
    this.blocks.forEach((column, i) => {
      result[i] = []
      column.forEach((block, j) => {
        result[i][j] = block.isWall
      })
    })
    return result
  }

  get cat () {
    return this.data.get('cat')
  }

  set cat (value) {
    this.data.set('cat', value)
  }

  get state () {
    return this.data.get('state')
  }

  set state (value) {
    switch (value) {
      case GameState.PLAYING:
        break
      case GameState.LOSE:
        // '猫已经跑到地图边缘了，你输了'
        break
      case GameState.WIN:
        // '猫已经无路可走，你赢了'
        break
      default:
        return
    }
    this.data.set('state', value)
  }

  create () {
    this.createBlocks()
    this.createCat()
    this.reset()
  }

  getBlock (i, j) {
    if (!(i >= 0 && i < this.w && j >= 0 && j < this.h)) {
      return null
    }
    return this.blocks[i][j]
  }

  playerClick (i, j) {
    if (this.state !== GameState.PLAYING) {
      this.reset()
      return {
        result: false,
        message: '游戏已经结束，重新开局'
      }
    }
    const block = this.getBlock(i, j)
    if (!block) {
      return {
        result: false,
        message: '代码错误，当前位置不存在'
      }
    }
    if (block.isWall) {
      return {
        result: false,
        message: '点击位置已经是墙了，禁止点击'
      }
    }
    if (this.cat.i === i && this.cat.j === j) {
      return {
        result: false,
        message: '点击位置是猫当前位置，禁止点击'
      }
    }
    block.isWall = true
    if (this.cat.isCaught()) {
      this.state = GameState.WIN
      return {
        result: false,
        message: '猫已经无路可走，你赢了',
        state: this.state
      }
    }

    this.recordCoord.cat.push({ i: this.cat.i, j: this.cat.j })
    this.recordCoord.wall.push({ i, j })
    const click = restoreNumberToLetter([j + 1, i + 1])
    const catOldPos = restoreNumberToLetter([this.cat.j + 1, this.cat.i + 1])
    const result = this.cat.step()
    const catNewPos = restoreNumberToLetter([this.cat.j + 1, this.cat.i + 1])
    const message = `您点击了 ${click} 猫从 ${catOldPos} 移动到 ${catNewPos}`
    if (!result) {
      this.state = GameState.WIN
      return {
        result: false,
        message: '猫认输，你赢了！',
        state: this.state
      }
    }
    if (this.cat.state) {
      switch (this.cat.state) {
        case 'escaped':
          this.state = GameState.LOSE
          return {
            result: false,
            message: '猫已经跑到地图边缘了，你输了',
            state: this.state
          }
        case 'win':
          this.state = GameState.WIN
          return {
            result: false,
            message: '猫已经无路可走，你赢了',
            state: this.state
          }
      }
    }
    return {
      result: true,
      message
    }
  }

  reset () {
    this.cat.reset()
    this.resetBlocks()
    this.randomWall()

    this.recordCoord = {
      cat: [],
      wall: []
    }
    this.state = GameState.PLAYING
    // '点击小圆点，围住小猫'
  }

  undo () {
    if (this.recordCoord.cat.length) {
      if (this.state !== GameState.PLAYING) {
        this.reset()
        return {
          message: '游戏已经结束，重新开局'
        }
      } else {
        const catCoord = this.recordCoord.cat.pop()
        const { i, j } = this.recordCoord.wall.pop()

        this.cat.undo(catCoord.i, catCoord.j)
        this.getBlock(i, j).isWall = false
        return {
          message: '撤销成功'
        }
      }
    } else {
      return {
        message: '无路可退！！！'
      }
    }
  }

  createBlocks () {
    const blocks = []
    for (let i = 0; i < this.w; i++) {
      blocks[i] = []
      for (let j = 0; j < this.h; j++) {
        const block = new Block(i, j)
        blocks[i][j] = block
      }
    }
    this.blocks = blocks
  }

  createCat () {
    const cat = new Cat(this)
    cat.solver = nearestSolver
    this.cat = cat
  }

  resetBlocks () {
    this.blocks.forEach(blocks => {
      blocks.forEach(block => {
        block.isWall = false
      })
    })
  }

  randomWall () {
    const array = []
    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        if (i !== this.cat.i || j !== this.cat.j) {
          array.push(j * this.w + i)
        }
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (i >= this.initialWallCount) {
        break
      }
      // Shuffle array
      const j = i + Math.floor(Math.random() * (array.length - i))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
      // Set wall
      const wallI = array[i] % this.w
      const wallJ = Math.floor(array[i] / this.w)
      this.getBlock(wallI, wallJ).isWall = true
    }
  }
}
