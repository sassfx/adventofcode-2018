import { Puzzle } from '../puzzle'
import { FrequencyCalculator } from './frequency-calculator'
import { FileReader } from '../../utils'

export class One implements Puzzle<number, number> {
  calculatePartOne(): number {
    const frequencyText = FileReader.ReadFile('./puzzles/one/data.txt')
    const calc = new FrequencyCalculator()
    return calc.calculateFrequency(frequencyText, '\n')
  }

  calculatePartTwo(): number {
    const frequencyText = FileReader.ReadFile('./puzzles/one/data.txt')
    const calc = new FrequencyCalculator()
    return calc.calculateFirstFrequencyReachedTwice(frequencyText, '\n')
  }
}