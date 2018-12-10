import { parseInstructions, timeInstructions } from './instruction-parser'

describe('Instruction Parser', () => {
  const instructions = `Step C must be finished before step A can begin.
    Step C must be finished before step F can begin.
    Step A must be finished before step B can begin.
    Step A must be finished before step D can begin.
    Step B must be finished before step E can begin.
    Step D must be finished before step E can begin.
    Step F must be finished before step E can begin.`
  describe('parseInstructions', () => {
    it('completes nodes in correct order', () => {
      expect(parseInstructions(instructions).join('')).toEqual('CABDFE')
    })
  })

  describe('timeInstructions', () => {
    it('calculates correct time', () => {
      expect(timeInstructions(instructions, 2, 0)).toEqual(15)
    })
  })
})