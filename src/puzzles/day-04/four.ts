import { Puzzle } from '../puzzle'
import { GuardSleepCalculator } from './guard-sleep-calculator'
import { FileReader } from '../../utils'

const calc = new GuardSleepCalculator()
const claims = FileReader.ReadFile(4, 'guards')

export class Four implements Puzzle<number, number> {
  calculatePartOne():number {
    return calc.calculateStrategyOne(claims)
  }

  calculatePartTwo():number {
    return calc.calculateStrategyTwo(claims)
  }
}