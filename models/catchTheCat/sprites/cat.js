import { getNeighbours } from './utils.js'
import defaultSolver from '../solvers/defaultSolver.js'

export default class Cat {
  constructor (scene) {
    this.scene = scene
    this.solver = defaultSolver
    this.reset()
    this.state = false
  }

  data = {}

  getData (key) {
    return this.data[key]
  }

  setData (key, value) {
    this.data[key] = value
  }

  get i () {
    return this.getData('i')
  }

  set i (value) {
    this.setData('i', value)
  }

  get j () {
    return this.getData('j')
  }

  set j (value) {
    this.setData('j', value)
  }

  get direction () {
    return this.getData('direction')
  }

  set direction (value) {
    this.setData('direction', value)
  }

  get solver () {
    return this.getData('solver')
  }

  set solver (value) {
    this.setData('solver', value)
  }

  reset () {
    this.direction = 5 // data.catDefaultDirection
    this.resetIJ()
  }

  setIJ (i, j) {
    this.i = i
    this.j = j
  }

  resetIJ () {
    this.setIJ(Math.floor(this.scene.w / 2), Math.floor(this.scene.h / 2))
  }

  isEscaped () {
    return this.i <= 0 || this.i >= this.scene.w - 1 ||
        this.j <= 0 || this.j >= this.scene.h - 1
  }

  checkState () {
    if (this.isEscaped()) {
      this.state = 'escaped'
    } else if (this.isCaught()) {
      this.state = 'win'
    }
  }

  undo (i, j) {
    this.setIJ(i, j)
  }

  step () {
    const direction = this.solver(this.scene.blocksData, this.i, this.j)
    if (direction < 0 || direction > 6) {
      return false
    }
    const result = this.stepDirection(direction)
    if (!result) {
      return false
    }
    return true
  }

  isCaught () {
    return !this.getCurrentNeighbours()
      .some((neighbour, direction) => {
        const block = this.scene.getBlock(neighbour.i, neighbour.j)
        return block !== null && !block.isWall
      })
  }

  getCurrentNeighbours () {
    return getNeighbours(this.i, this.j)
  }

  moveForward () {
    const neighbour = this.getCurrentNeighbours()[this.direction]
    this.setIJ(neighbour.i, neighbour.j)
    this.checkState()
  }

  stepForward () {
    const neighbour = this.getCurrentNeighbours()[this.direction]
    const block = this.scene.getBlock(neighbour.i, neighbour.j)
    if (block === null) {
      return false
    }
    if (block.isWall) {
      return false
    }
    this.moveForward()
    return true
  }

  stepDirection (direction) {
    this.direction = direction
    return this.stepForward()
  }
}
