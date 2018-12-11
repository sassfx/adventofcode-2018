import { create2dArray } from '../../utils'

export type Point = {
  label:string,
  x:number,
  y:number,
}

export function findAreaWithTotalDistanceToAllPointsLessThanThreshold(points:Point[], threshold:number) {
  const xSize = Math.max(...points.map(p => p.x))
  const ySize = Math.max(...points.map(p => p.y))

  const grid = create2dArray(xSize, ySize, () => '')

  let count = 0

  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      const currentPoint = { x: i + 1, y: j + 1, label: '' }

      const distances = points.map(p => calculateManhattanDistance(currentPoint, p))
      const totalDistance = distances.reduce((curr, acc) => curr + acc, 0)

      if (totalDistance < threshold) {
        count++
      }
    }
  }

  return count
}

export function findAreaOfPointWithMaximumFiniteArea(points:Point[]):number {
  const grid = createMinimumDistanceGrid(points)

  let maxDistance = 0
  for(let point of points) {
    let currentDistance = 0
    if (isFinite(point, grid)) {
      currentDistance = getAreaOfPoint(point, grid)
    }  

    if (currentDistance > maxDistance) {
      maxDistance = currentDistance
    }
  }

  return maxDistance
}

function isFinite(point:Point, grid:string[][]):boolean {
  return checkDirection(point, grid, p => ({ x: p.x + 1, y: p.y, label: p.label })) &&
    checkDirection(point, grid, p => ({ x: p.x - 1, y: p.y, label: p.label })) &&
    checkDirection(point, grid, p => ({ x: p.x, y: p.y + 1, label: p.label })) &&
    checkDirection(point, grid, p => ({ x: p.x, y: p.y - 1, label: p.label }))
}

function checkDirection(point:Point, grid:string[][], nextPoint: (x:Point) => Point) {
  let currentPoint = point
  while (true) {
    let { x, y } = currentPoint
    x = x - 1
    y = y - 1
    if (y < 0 || y >= grid.length) {
      return false
    }

    if (x < 0 || x >= grid[0].length) {
      return false
    }

    if (grid[y][x] !== point.label) {
      return true
    }

    currentPoint = nextPoint(currentPoint)
  }
}

function getAreaOfPoint(point:Point, grid:string[][]):number {
  let area = 0
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[j][i] === point.label) {
        area++
      }
    }
  }

  return area
}

const empty = '.'

function createMinimumDistanceGrid(points:Point[]) {
  const xSize = Math.max(...points.map(p => p.x))
  const ySize = Math.max(...points.map(p => p.y))

  const grid = create2dArray(xSize, ySize, () => '')

  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      const currentPoint = { x: i + 1, y: j + 1, label: '' }

      const distances = points.map(p => calculateManhattanDistance(currentPoint, p))
      const minDistance = Math.min(...distances)

      if (distances.filter(x => x === minDistance).length === 1) {
        const index = distances.indexOf(minDistance)
        const point = points[index]
        grid[j][i] = point.label
      }
      else {
        grid[j][i] = empty
      }
    }
  }

  return grid
}

function calculateManhattanDistance(first:Point, second:Point):number {
  return Math.abs(first.x - second.x) + Math.abs(first.y - second.y)
}