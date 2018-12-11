import { Puzzle } from '../puzzle'
import { FrequencyCalculator } from './frequency-calculator'
import { FileReader } from '../../utils'

const frequencyText = FileReader.ReadFile(1, 'data')
const calc = new FrequencyCalculator()

export class One implements Puzzle<number, number> {
  calculatePartOne(): number {
    return calc.calculateFrequency(frequencyText, '\n')
  }

  calculatePartTwo(): number {
    return calc.calculateFirstFrequencyReachedTwice(frequencyText, '\n')
  }
}