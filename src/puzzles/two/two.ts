import { Puzzle } from '../puzzle'
import { ChecksumCalculator } from './checksum-calculator'
import { StringComparer } from './string-comparer'
import { FileReader } from '../../utils'

export class Two implements Puzzle<number, string> {
  calculatePartOne():number {
    const frequencyText = FileReader.ReadFile('./puzzles/two/data.txt')
    const parts = frequencyText.split('\n').map(part => part.trim())
    const calc = new ChecksumCalculator()

    return calc.calculateChecksum(parts)
  }

  calculatePartTwo():string {
    const frequencyText = FileReader.ReadFile('./puzzles/two/data.txt')
    const parts = frequencyText.split('\n').map(part => part.trim())
    const comparer = new StringComparer()

    return comparer.findWordsThatDifferByOneLetter(parts)
  }
}