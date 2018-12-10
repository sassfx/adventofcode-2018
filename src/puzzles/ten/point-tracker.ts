export class Point {
  xPosition:number
  yPosition:number
  xVelocity:number
  yVelocity:number

  constructor(xPosition:number, yPosition:number, xVelocity:number, yVelocity:number) {
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity
  }

  step() {
    this.xPosition = this.xPosition + this.xVelocity
    this.yPosition = this.yPosition + this.yVelocity
  }

  isNextTo(other:Point) {
    const xDistance = Math.abs(this.xPosition - other.xPosition)
    const yDistance = Math.abs(this.yPosition - other.yPosition)

    return (xDistance + yDistance) === 1 || (xDistance === 1 && yDistance === 1)
  }
}

export function runPointsUntilAllAreNextToEachOther(points:Point[]):number {
  let count = 0
  while(!(areAllPointsNextTAtLeastOneOtherPoint(points))) {
    points.forEach(x => x.step())
    count++
  }

  return count
}

export function areAllPointsNextTAtLeastOneOtherPoint(points:Point[]):boolean {
  for(let point of points) {
    if(points.filter(x => point.isNextTo(x)).length === 0)
    {
      return false
    }
  }

  return true
}

export function drawPoints(points:Point[]) {
  const xMin = Math.min(...points.map(x => x.xPosition))
  const xMax = Math.max(...points.map(x => x.xPosition))
  const yMin = Math.min(...points.map(x => x.yPosition))
  const yMax = Math.max(...points.map(x => x.yPosition))

  for (let j = yMin; j <= yMax; j++) {
    const line:string[] = []
    for (let i = xMin; i <= xMax; i++) {
      if (points.find(x => x.xPosition === i && x.yPosition === j)) {
        line.push('#')
      }
      else {
        line.push('.')
      }
    }
    console.log(line.join(''))
  }
}