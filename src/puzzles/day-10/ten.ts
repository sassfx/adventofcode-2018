import { Puzzle } from '../puzzle'
import { FileReader, textToArray } from '../../utils'
import { Point, runPointsUntilAllAreNextToEachOther, drawPoints } from './point-tracker'

const pointsRegex = /position=<(?<xPosition>\s*(?:-?)\d+),(?<yPosition>\s*(?:-?)\d+)>\svelocity=<(?<xVelocity>\s*(?:-?)\d+),(?<yVelocity>\s*(?:-?)\d+)>/g

export class Ten implements Puzzle<number, number> {
  calculatePartOne(): number {
    const pointsText = FileReader.ReadFile(10, 'points')
    const points = textToArray(pointsText, pointsRegex, ({ xPosition, yPosition, xVelocity, yVelocity }) => 
      new Point(parseInt(xPosition), parseInt(yPosition), parseInt(xVelocity), parseInt(yVelocity)))
    runPointsUntilAllAreNextToEachOther(points)
    drawPoints(points)
    return 1
  }

  calculatePartTwo(): number {
    const pointsText = FileReader.ReadFile(10, 'points')
    const points = textToArray(pointsText, pointsRegex, ({ xPosition, yPosition, xVelocity, yVelocity }) => 
      new Point(parseInt(xPosition), parseInt(yPosition), parseInt(xVelocity), parseInt(yVelocity)))
    return runPointsUntilAllAreNextToEachOther(points)
  }
}