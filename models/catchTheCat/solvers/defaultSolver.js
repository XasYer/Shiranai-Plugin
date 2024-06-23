import { getNeighbours } from '../sprites/utils.js'

export default function defaultSolver (blocksIsWall, i, j) {
  let result = -1
  const neighbours = getNeighbours(i, j)
  neighbours.forEach((neighbour, direction) => {
    if (result === -1) {
      if (blocksIsWall[neighbour.i] !== undefined &&
                blocksIsWall[neighbour.i][neighbour.j] !== undefined &&
                !blocksIsWall[neighbour.i][neighbour.j]) {
        result = direction
      }
    }
  })
  return result
}
