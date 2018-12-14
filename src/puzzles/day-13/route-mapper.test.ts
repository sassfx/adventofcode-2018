import { runRouteUntilFirstCrash, runRouteUntilOnlyOneCartLeft } from './route-mapper'
const testInput = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `

const secondtestInput = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`

describe('RouteMapper', () => {
  describe('runRouteUntilFirstCrash', () => {
    it('returns correct coordinate for test input', () => {
      expect(runRouteUntilFirstCrash(testInput)).toEqual({ x: 7, y: 3 })
    })
  })

  describe('runRouteUntilOnlyOneCartLeft', () => {
    it('returns correct coordinate for test input', () => {
      expect(runRouteUntilOnlyOneCartLeft(secondtestInput)).toEqual({ x: 6, y: 4 })
    })
  })
})