import { playMarbles } from './marble-list'

describe('playMarbles', () => {
  const cases = [
    { players: 9, marbles: 25, expected: 32},
    { players: 10, marbles: 1618, expected: 8317},
    { players: 13, marbles: 7999, expected: 146373},
    { players: 17, marbles: 1104, expected: 2764},
    { players: 21, marbles: 6111, expected: 54718},
    { players: 30, marbles: 5807, expected: 37305},
  ]
  it('returns correct high score', () => {
    for (let item of cases) {
      const scores = playMarbles(item.players, item.marbles)
      expect(Math.max(...scores)).toBe(item.expected)
    }
  })
})
