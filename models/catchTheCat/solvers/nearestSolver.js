import { getNeighbours } from '../sprites/utils.js'

class Block {
  constructor (parent, i, j, isWall) {
    this.i = i
    this.j = j
    this.isWall = isWall
    this.distance = Infinity
    this.parent = parent
    this.isEdge = this.i <= 0 || this.i >= this.parent.w - 1 || this.j <= 0 || this.j >= this.parent.h - 1
  }

  get routesCount () {
    if (this._routesCount === undefined) {
      if (this.isEdge) {
        this._routesCount = 1
      } else {
        let routesCount = 0
        this.neighbours.forEach(neighbour => {
          if (neighbour !== null && !neighbour.isWall) {
            if (neighbour.distance < this.distance) {
              routesCount += neighbour.routesCount
            }
          }
        })
        this._routesCount = routesCount
      }
    }
    return this._routesCount
  }

  get neighbours () {
    if (this._neighbours === undefined) {
      const neighbours = getNeighbours(this.i, this.j)
      this._neighbours = neighbours.map(neighbour => {
        return this.parent.getBlock(neighbour.i, neighbour.j)
      })
    }
    return this._neighbours
  }

  get directions () {
    const result = []
    this.neighbours.forEach((neighbour, direction) => {
      if (neighbour !== null && !neighbour.isWall) {
        if (neighbour.distance < this.distance) {
          result.push(direction)
        }
      }
    })
    return result
  }

  get direction () {
    let maxRoutesCount = 0
    let result = -1
    this.directions.forEach(direction => {
      const neighbour = this.neighbours[direction]
      if (neighbour.routesCount > maxRoutesCount) {
        maxRoutesCount = neighbour.routesCount
        result = direction
      }
    })
    return result
  }
}

class Blocks {
  constructor (blocksIsWall) {
    this.w = blocksIsWall.length
    if (this.w <= 0) {
      throw new Error('empty blocks')
    }
    this.h = blocksIsWall[0].length
    this.blocks = blocksIsWall.map((col, i) => {
      return col.map((block, j) => {
        return new Block(this, i, j, blocksIsWall[i][j])
      })
    })
  }

  getBlock (i, j) {
    if (!(i >= 0 && i < this.w && j >= 0 && j < this.h)) {
      return null
    }
    return this.blocks[i][j]
  }

  /**
     * 滴水法 BFS 求每一块到边缘距离
     *
     * 1. 初始化一个队列，添加所有边界块，距离设为 0
     * 2. 遍历队列中每一个元素，对于他周围的 6 个相邻块
     *     * 如果没有遍历过，则设置为当前距离 + 1
     *     * 如果遍历过，则设置为它的距离与当前距离 + 1 中间的较小值
     */
  calcAllDistances () {
    const queue = []
    this.blocks.forEach(col => {
      col.forEach(block => {
        if (block.isEdge && !block.isWall) {
          block.distance = 0
          queue.push(block)
        }
      })
    })
    while (queue.length > 0) {
      const block = queue.shift()
      block.neighbours.forEach(neighbour => {
        if (neighbour !== null && !neighbour.isEdge && !neighbour.isWall) {
          if (neighbour.distance > block.distance + 1) {
            neighbour.distance = block.distance + 1
            if (queue.indexOf(neighbour) < 0) {
              queue.push(neighbour)
            }
          }
        }
      })
    }
  }

  toString () {
    const lines = []
    for (let j = 0; j < this.h; j++) {
      const distances = []
      for (let i = 0; i < this.w; i++) {
        const block = this.getBlock(i, j)
        if (block.isWall) {
          distances.push('*')
        } else if (block.distance === Infinity) {
          distances.push('-')
        } else {
          distances.push(block.distance)
        }
      }
      let line = distances.join(' ')
      if ((j & 1) === 1) {
        line = ' ' + line
      }
      lines.push(line)
    }
    return lines.join('\n')
  }

  toString2 () {
    const lines = []
    for (let j = 0; j < this.h; j++) {
      const distances = []
      for (let i = 0; i < this.w; i++) {
        const block = this.getBlock(i, j)
        if (block.isWall) {
          distances.push('*')
        } else if (block.routesCount === Infinity) {
          distances.push('-')
        } else {
          distances.push(block.routesCount)
        }
      }
      let line = distances.join(' ')
      if ((j & 1) === 1) {
        line = ' ' + line
      }
      lines.push(line)
    }
    return lines.join('\n')
  }
}

export function nearestSolver (blocksIsWall, i, j) {
  const blocks = new Blocks(blocksIsWall)
  blocks.calcAllDistances()
  const block = blocks.getBlock(i, j)
  const directions = block.directions
  if (directions.length > 0) {
    return directions[0]
  } else {
    return -1
  }
}

export default function nearestAndMoreRoutesSolver (blocksIsWall, i, j) {
  const blocks = new Blocks(blocksIsWall)
  blocks.calcAllDistances()
  const block = blocks.getBlock(i, j)
  return block.direction
}
