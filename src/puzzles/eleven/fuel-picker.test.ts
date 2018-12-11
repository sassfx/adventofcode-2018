import { calculatePowerLevel, getCellWithHighestFuel } from './fuel-picker'

describe('FuelPicker', () => {
  describe('calculatePowerLevel', () => {
    it('calculates correct power level', () => {
      expect(calculatePowerLevel(122, 79, 57)).toBe(-5)
      expect(calculatePowerLevel(217, 196, 39)).toBe(0)
      expect(calculatePowerLevel(101, 153, 71)).toBe(4)
    })
  })

  describe('getCellWithHighestFuel', () => {
    it('calculates correct cell', () => {
      expect(getCellWithHighestFuel(300, 300, 42)).toEqual({ x: 21, y: 61 })
    })
  })
})