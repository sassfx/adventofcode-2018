import { runPlantSimulation } from './plant-simulator'

const testinput = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`

describe('PlantSimulator', () => {
  describe('runPlantSimulation', () => {
    it('creates correct sum', () => {
      expect(runPlantSimulation(testinput, 20)).toBe(325)
    })
  })
})