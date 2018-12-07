import { Puzzle } from '../puzzle'
import { GuardSleepCalculator } from './guard-sleep-calculator'
import { FileReader } from '../../utils'

export class Four implements Puzzle<number, number> {
  calculatePartOne():number {
    const calc = new GuardSleepCalculator()
    const claims = FileReader.ReadFile('./puzzles/four/guards.txt')
    return calc.calculateStrategyOne(claims)
  }

  calculatePartTwo():number {
    const calc = new GuardSleepCalculator()
    const claims = FileReader.ReadFile('./puzzles/four/guards.txt')
    return calc.calculateStrategyTwo(claims)
  }
}