export function getNeighbours (i, j) {
  const left = { i: i - 1, j }
  const right = { i: i + 1, j }
  let top_left
  let top_right
  let bottom_left
  let bottom_right
  if ((j & 1) === 0) {
    top_left = { i: i - 1, j: j - 1 }
    top_right = { i, j: j - 1 }
    bottom_left = { i: i - 1, j: j + 1 }
    bottom_right = { i, j: j + 1 }
  } else {
    top_left = { i, j: j - 1 }
    top_right = { i: i + 1, j: j - 1 }
    bottom_left = { i, j: j + 1 }
    bottom_right = { i: i + 1, j: j + 1 }
  }
  const neighbours = []
  neighbours[0] = left
  neighbours[1] = top_left
  neighbours[2] = top_right
  neighbours[3] = right
  neighbours[4] = bottom_right
  neighbours[5] = bottom_left
  return neighbours
}
