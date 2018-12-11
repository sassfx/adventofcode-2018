import { StringComparer } from './string-comparer'

describe('StringComparer', () => {
  const comparer = new StringComparer()
  describe('findWordsThatDifferByOneLetter', () =>  {
    it('finds the correct string', () => {
      const input = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']

      const result = comparer.findWordsThatDifferByOneLetter(input)

      expect(result).toBe('fgij')
    })
  })
})