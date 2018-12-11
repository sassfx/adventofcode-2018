import { ChecksumCalculator } from './checksum-calculator'

describe('ChecksumCalculator', () => {
  const calc = new ChecksumCalculator()
  describe('calculateChecksum', () => {
    it('calculates correct checksum', () => {
      const parts = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']
      const result = calc.calculateChecksum(parts)
      expect(result).toBe(12)
    })
  })
})