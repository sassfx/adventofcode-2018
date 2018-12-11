import { 
  findAreaOfPointWithMaximumFiniteArea,
  findAreaWithTotalDistanceToAllPointsLessThanThreshold
} from './point-area-helpers'

describe('PointAreaHelpers', () => {
  const points = [
    createPoint(1, 1, 'A'),
    createPoint(1, 6, 'B'),
    createPoint(8, 3, 'C'),
    createPoint(3, 4, 'D'),
    createPoint(5, 5, 'E'),
    createPoint(8, 9, 'F'),
  ]

  describe('findAreaOfPointWithMaximumFiniteArea', () => {
    it('calculates the correct maximum area', () => {
      const result = findAreaOfPointWithMaximumFiniteArea(points)
      expect(result).toBe(17)
    })
  })

  describe('findAreaWithTotalDistanceToAllPointsLessThanThreshold', () => {
    it('calculates the correct area', () => {
      const result = findAreaWithTotalDistanceToAllPointsLessThanThreshold(points, 32)
      expect(result).toBe(16)
    })
  })
})

function createPoint(x, y, label) {
  return {
    x,
    y,
    label
  }
}