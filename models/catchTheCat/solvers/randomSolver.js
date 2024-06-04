import { getNeighbours } from '../sprites/utils.js'

export default function randomSolver (blocksIsWall, i, j) {
  let neighbours = getNeighbours(i, j)
  let directions = []
  neighbours.forEach((neighbour, direction) => {
    if (blocksIsWall[neighbour.i] !== undefined &&
            blocksIsWall[neighbour.i][neighbour.j] !== undefined &&
            !blocksIsWall[neighbour.i][neighbour.j]) {
      directions.push(direction)
    }
  })
  return directions[Math.floor(directions.length * Math.random())]
}
