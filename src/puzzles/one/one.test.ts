import { One } from './one'

describe('One', () => {
  const one = new One()
  describe('calculatePartOne', () => {
    it('returns expected result', () => {
      expect(one.calculatePartOne()).toEqual(1)
    })
  })

  describe('calculatePartTwo', () => {
    it('returns expected result', () => {
      expect(one.calculatePartTwo()).toEqual(2)
    })
  })
})