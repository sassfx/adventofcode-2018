import { PolymerReactor } from './polymer-reactor'

describe('PolymerReactor', () => {
  const reactor = new PolymerReactor()

  describe('reactPolymer', () => {
    const testCases = [
      { input: 'aA', expected: '' },
      { input: 'aBbA', expected: '' },
      { input: 'aabAAB', expected: 'aabAAB' },
      { input: 'dabAcCaCBAcCcaDA', expected: 'dabCBAcaDA'}
    ]

    it('returns correct results for test cases', () => {
      for (let test of testCases) {
        expect(reactor.reactPolymer(test.input.split(''))).toEqual(test.expected.split(''))
      }
    })
  })
})