import { sumNodeMetadata, calculateRootNodeValue } from './node'

describe('Node', () => {
  const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(x => parseInt(x.trim()))

  describe('sumNodeMetadata', () => {
    it('correctly sums metadata', () => {
      expect(sumNodeMetadata(input)).toBe(138)
    })
  })

  describe('calculateRootNodeValue', () => [
    it('calculates correct value', () => {
      expect(calculateRootNodeValue(input)).toBe(66)
    })
  ])
})