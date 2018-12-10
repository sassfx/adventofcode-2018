import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { Point, runPointsUntilAllAreNextToEachOther, areAllPointsNextTAtLeastOneOtherPoint, drawPoints } from './point-tracker'

const pointsText = FileReader.ReadFile('./puzzles/ten/points.txt')
const pointsRegex = /position=<(?<xPosition>\s*(?:-?)\d+),(?<yPosition>\s*(?:-?)\d+)>\svelocity=<(?<xVelocity>\s*(?:-?)\d+),(?<yVelocity>\s*(?:-?)\d+)>/g

function getPointsFromText():Point[] {
  const points:Point[] = []

  let match = pointsRegex.exec(pointsText)
  while(match) {
    const { xPosition, yPosition, xVelocity, yVelocity } = match.groups
    points.push(new Point(parseInt(xPosition), parseInt(yPosition), parseInt(xVelocity), parseInt(yVelocity)))
    match = pointsRegex.exec(pointsText)
  }

  return points
}

export class Ten implements Puzzle<number, number> {
  calculatePartOne(): number {
    const points = getPointsFromText()
    runPointsUntilAllAreNextToEachOther(points)
    drawPoints(points)
    return 1
  }

  calculatePartTwo(): number {
    const points = getPointsFromText()
    return runPointsUntilAllAreNextToEachOther(points)
  }
}