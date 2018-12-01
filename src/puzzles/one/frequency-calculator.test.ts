import { FrequencyCalculator } from './frequency-calculator'

describe('FrequencyCalculator', () => {
  const calc = new FrequencyCalculator()

  describe('calculateFrequency', () => {
    it('returns correct value for +1, +1, +1', () => {
      const result = calc.calculateFrequency('+1, +1, +1', ',')
      expect(result).toBe(3)
    })
    
    it('returns correct value for +1, +1, -2', () => {
      const result = calc.calculateFrequency('+1, +1, -2', ',')
      expect(result).toBe(0)
    })

    it('returns correct value for -1, -2, -3', () => {
      const result = calc.calculateFrequency('-1, -2, -3', ',')
      expect(result).toBe(-6)
    })
  })

  describe('calculateFirstFrequencyReachedTwice', () => {
    it('returns correct value for +1, -1', () => {
      const result = calc.calculateFirstFrequencyReachedTwice('+1, -1', ',')
      expect(result).toBe(0)
    })

    it('returns correct value for +3, +3, +4, -2, -4', () => {
      const result = calc.calculateFirstFrequencyReachedTwice('+3, +3, +4, -2, -4', ',')
      expect(result).toBe(10)
    })

    it('returns correct value for -6, +3, +8, +5, -6', () => {
      const result = calc.calculateFirstFrequencyReachedTwice('-6, +3, +8, +5, -6', ',')
      expect(result).toBe(5)
    })

    it('returns correct value for +7, +7, -2, -7, -4', () => {
      const result = calc.calculateFirstFrequencyReachedTwice('+7, +7, -2, -7, -4', ',')
      expect(result).toBe(14)
    })
  })
})