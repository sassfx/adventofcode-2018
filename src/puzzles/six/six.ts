import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import {
  findAreaOfPointWithMaximumFiniteArea,
  findAreaWithTotalDistanceToAllPointsLessThanThreshold,
  Point
} from './point-area-helpers'

const pointsRegex = /(?<xString>\d+),\s(?<yString>\d+)/g

export class Six implements Puzzle<number, number> {
  calculatePartOne():number {
    const points = readPoints()
    return findAreaOfPointWithMaximumFiniteArea(points)
  }

  calculatePartTwo():number {
    const points = readPoints()
    return findAreaWithTotalDistanceToAllPointsLessThanThreshold(points, 10000)
  }
}

function readPoints():Point[] {
  const points:Point[] = []
  const pointsText = FileReader.ReadFile('./puzzles/six/points.txt')

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let match = pointsRegex.exec(pointsText)
  let index = 0
  let second = 0
  while (match) {
    const { xString, yString } = match.groups
    const x = parseInt(xString)
    const y = parseInt(yString)
    const label = letters[index] + second

    points.push({ x, y, label })

    match = pointsRegex.exec(pointsText)
    index++

    if (index > 25) {
      index = 0
      second++
    }
  }

  return points
}