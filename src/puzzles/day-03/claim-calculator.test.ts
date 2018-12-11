import { ClaimCalculator } from './claim-calculator'

describe('ClaimCalculator', () => {
  const calc = new ClaimCalculator()
  const claims = `#1 @ 1,3: 4x4
  #2 @ 3,1: 4x4
  #3 @ 5,5: 2x2`

  describe('calculateOverlappingClaims', () => {
    it('calculates correct number of overlapping claim spaces', () => {
      const result = calc.calculateOverlappingClaims(claims, 8)
      expect(result).toBe(4)
    })
  })

  describe('getClaimWithNoOverlap', () => {
    it('correctly determines claim with no overlap', () => {
      const result = calc.getClaimWithNoOverlap(claims, 8)
      expect(result).toBe(3)
    })
  })
})