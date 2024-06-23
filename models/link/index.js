import { Config } from '#components'

export class LinkGame {
  constructor () {
    this.score = 0 // 得分
    this.cols = Config.linkGame.cols + 2 || 10 // 列数
    this.rows = Config.linkGame.rows + 2 || 8 // 行数
    this.level = Config.linkGame.level || 0 // 等级
    this.leftDisorderTime = 5 // 剩余重排次数
    this.leftTime = Config.linkGame.leftTime || 180 // 剩余时间
    this.gifts = Config.linkGame.design
  }

  init (isReset) {
    this.stack = []
    this.iconTypeCount = this.level + 11 // 图片的种类
    this.count = (this.rows - 2) * (this.cols - 2) // 图片的总数
    this.remain = this.count // 剩余的未有消去的图片
    this.pictures = [] // 图片集合
    this.linkPictures = []
    this.preClickInfo = null // 上一次被点中的图片信息
    this.points = [] // 图片可以相消时的拐点集合
    this.timmer = setInterval(() => {
      this.updateCountDown()
    }, 1000)
    this.createMap()
    this.disorder()
    // !isReset && this.bindDomEvents();
    // this.updateLevel();
    // this.domUpdateScore();
  }

  createMap () {
    let count = 0
    for (let row = 0; row < this.rows; row++) {
      this.pictures.push([])
      for (let col = 0; col < this.cols; col++) {
        // 边界元素
        if (row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1) {
          this.pictures[row].push({
            row,
            col,
            isEmpty: true,
            isBoundary: true
          })

          // 内部元素
        } else {
          this.pictures[row].push({
            row,
            col,
            isEmpty: false,
            index: count,
            pic: this.gifts[parseInt(count / 2) % this.iconTypeCount],
            isBoundary: false
          })
          count++
        }
      }
    }
  }

  // 打乱顺序
  disorder () {
    const pictures = this.pictures
    const random = this.random.bind(this)
    for (let i = 0; i < this.count * 10; i++) {
      // 随机选中2张图片，调用this.swapProperties交换俩人的pic和isEmpty属性
      const picture1 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)]
      const picture2 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)]
      this.swapProperties(picture1, picture2, ['pic', 'isEmpty'])
    }
  }

  // 检测连通性
  checkMatch (curClickInfo, preClickInfo) {
    const pictures = this.pictures
    const preRow = +preClickInfo.row
    const preCol = +preClickInfo.col
    const preIndex = `${preClickInfo.row},${preClickInfo.col}`
    const curRow = +curClickInfo.row
    const curCol = +curClickInfo.col
    const curIndex = `${curClickInfo.row},${curClickInfo.col}`

    // 如果点击的图片是空白的，则退出
    if (pictures[curRow][curCol].isEmpty || pictures[preRow][preCol].isEmpty) {
      return
    }

    // eslint-disable-next-line no-self-compare
    if (preIndex !== preIndex) { // NaN
      return
    }

    // 如果前后2次点击的是同一张图片，或者2张图片不是同类型的，则退出
    if (preIndex === curIndex || pictures[preRow][preCol].pic !== pictures[curRow][curCol].pic) {
      return
    }
    if (this.canCleanup(preCol, preRow, curCol, curRow)) {
      this.linkPictures = []
      for (let i = 0; i < this.points.length - 1; i++) {
        this.mergeArray(this.linkPictures, this.countPoints(this.points[i], this.points[i + 1]))
      }
      return this.updateStatus(preRow, preCol, curRow, curCol, preIndex, curIndex)
    }
  }

  updateStatus (preRow, preCol, curRow, curCol, preIndex, curIndex) {
    this.remain -= 2
    this.score += 10 * (this.linkPictures.length - 1)
    this.preClickInfo = null
    this.pictures[preRow][preCol].isEmpty = true
    this.pictures[curRow][curCol].isEmpty = true
    if (this.remain === 0) {
      ++this.level
      // this.nextLevel();
      return 1
    }
  }

  countPoints (start, end) {
    const points = []
    const pictures = this.pictures
    if (start[0] === end[0]) { // 同列
      const x = start[0]
      if (start[1] > end[1]) { // 从下到上
        for (let i = start[1]; i >= end[1]; i--) {
          points.push(pictures[i][x])
        }
      } else { // 从上到下
        for (let i = start[1]; i <= end[1]; i++) {
          points.push(pictures[i][x])
        }
      }
    } else if (start[1] === end[1]) { // 同行
      const y = start[1]
      if (start[0] > end[0]) { // 从右到左
        for (let i = start[0]; i >= end[0]; i--) {
          points.push(pictures[y][i])
        }
      } else { // 从左到右
        for (let i = start[0]; i <= end[0]; i++) {
          points.push(pictures[y][i])
        }
      }
    }
    return points
  }

  // 合并数组，并把相同的元素排除掉
  mergeArray (target, source) {
    source.forEach(function (e) {
      if (target.indexOf(e) === -1) {
        target.push(e)
      }
    })
  }

  // 生成一定范围内的随机数
  random (min, max) {
    return parseInt((Math.random() * max) + min)
  }

  // 交换对象属性
  swapProperties (obj1, obj2, properties) {
    properties.forEach(function (property) {
      const temp = obj1[property]
      obj1[property] = obj2[property]
      obj2[property] = temp
    })
  }

  updateCountDown () {
    --this.leftTime
    if (this.leftTime < 0) {
      clearInterval(this.timmer)
      // this.gameOver();
      this.gameStatus = -1
    }
  }

  isRowEmpty (x1, y1, x2, y2) {
    if (y1 != y2) {
      return false
    }
    // eslint-disable-next-line no-unused-expressions
    x1 > x2 && (x1 = x1 + x2, x2 = x1 - x2, x1 = x1 - x2) // 强制x1比x2小
    for (let j = x1 + 1; j < x2; ++j) { // from (x2,y2+1) to (x2,y1-1);
      if (!this.pictures[y1][j].isEmpty) {
        return false
      }
    }
    return true
  }

  isColEmpty (x1, y1, x2, y2) {
    if (x1 != x2) {
      return false
    }
    // eslint-disable-next-line no-unused-expressions
    y1 > y2 && (y1 = y1 + y2, y2 = y1 - y2, y1 = y1 - y2) // 强制y1比y2小

    for (let i = y1 + 1; i < y2; ++i) { // from (x2+1,y2) to (x1-1,y2);
      if (!this.pictures[i][x1].isEmpty) {
        return false
      }
    }
    return true
  }

  addPoints () {
    const args = arguments; const len = args.length; let i = 0

    for (; i < len;) {
      this.points.push(args[i++])
    }
  }

  // 判断两个坐标是否可以相互消除
  canCleanup (x1, y1, x2, y2) {
    this.points = []
    if (x1 === x2) {
      if (y1 - y2 === 1 || y2 - y1 === 1) { // 相邻
        this.addPoints([x1, y1], [x2, y2])
        return true
      } else if (this.isColEmpty(x1, y1, x2, y2)) { // 直线
        this.addPoints([x1, y1], [x2, y2])
        return true
      } else { // 两个拐点 (优化)
        let i = 1
        while ((x1 + i < this.cols) && this.pictures[y1][x1 + i].isEmpty) {
          if (!this.pictures[y2][x2 + i].isEmpty) {
            break
          } else {
            if (this.isColEmpty(x1 + i, y1, x1 + i, y2)) {
              this.addPoints([x1, y1], [x1 + i, y1], [x1 + i, y2], [x2, y2])
              return true
            }
            i++
          }
        }
        i = 1
        while ((x1 - i >= 0) && this.pictures[y1][x1 - i].isEmpty) {
          if (!this.pictures[y2][x2 - i].isEmpty) {
            break
          } else {
            if (this.isColEmpty(x1 - i, y1, x1 - i, y2)) {
              this.addPoints([x1, y1], [x1 - i, y1], [x1 - i, y2], [x2, y2])
              return true
            }
            i++
          }
        }
      }
    }

    if (y1 === y2) { // 同行
      if (x1 - x2 === 1 || x2 - x1 === 1) {
        this.addPoints([x1, y1], [x2, y2])
        return true
      } else if (this.isRowEmpty(x1, y1, x2, y2)) {
        this.addPoints([x1, y1], [x2, y2])
        return true
      } else {
        let i = 1
        while ((y1 + i < this.rows) && this.pictures[y1 + i][x1].isEmpty) {
          if (!this.pictures[y2 + i][x2].isEmpty) {
            break
          } else {
            if (this.isRowEmpty(x1, y1 + i, x2, y1 + i)) {
              this.addPoints([x1, y1], [x1, y1 + i], [x2, y1 + i], [x2, y2])
              return true
            }
            i++
          }
        }
        i = 1
        while ((y1 - i >= 0) && this.pictures[y1 - i][x1].isEmpty) {
          if (!this.pictures[y2 - i][x2].isEmpty) {
            break
          } else {
            if (this.isRowEmpty(x1, y1 - i, x2, y1 - i)) {
              this.addPoints([x1, y1], [x1, y1 - i], [x2, y1 - i], [x2, y2])
              return true
            }
            i++
          }
        }
      }
    }

    // 一个拐点
    if (this.isRowEmpty(x1, y1, x2, y1) && this.pictures[y1][x2].isEmpty) { // (x1,y1) -> (x2,y1)
      if (this.isColEmpty(x2, y1, x2, y2)) { // (x1,y2) -> (x2,y2)
        this.addPoints([x1, y1], [x2, y1], [x2, y2])
        return true
      }
    }
    if (this.isColEmpty(x1, y1, x1, y2) && this.pictures[y2][x1].isEmpty) {
      if (this.isRowEmpty(x1, y2, x2, y2)) {
        this.addPoints([x1, y1], [x1, y2], [x2, y2])
        return true
      }
    }

    // 不在一行的两个拐点
    if (x1 != x2 && y1 != y2) {
      let i = x1
      while (++i < this.cols) {
        if (!this.pictures[y1][i].isEmpty) {
          break
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2])
            return true
          }
        }
      }

      i = x1
      while (--i >= 0) {
        if (!this.pictures[y1][i].isEmpty) {
          break
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2])
            return true
          }
        }
      }

      i = y1
      while (++i < this.rows) {
        if (!this.pictures[i][x1].isEmpty) {
          break
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2])
            return true
          }
        }
      }

      i = y1
      while (--i >= 0) {
        if (!this.pictures[i][x1].isEmpty) {
          break
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2])
            return true
          }
        }
      }
    }

    return false
  }
}
