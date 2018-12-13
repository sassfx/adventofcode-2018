import { runRouteUntilFirstCrash } from './route-mapper'
const testInput = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `

describe('RouteMapper', () => {
  describe('runRouteUntilFirstCrash', () => {
    it('returns correct coordinate for test input', () => {
      expect(runRouteUntilFirstCrash(testInput)).toEqual({ x: 7, y: 3 })
    })
  })
})