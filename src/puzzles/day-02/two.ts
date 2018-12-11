import { Puzzle } from '../puzzle'
import { ChecksumCalculator } from './checksum-calculator'
import { StringComparer } from './string-comparer'
import { FileReader } from '../../utils'

const frequencyText = FileReader.ReadFile(2, 'data')
const parts = frequencyText.split('\n').map(part => part.trim())

export class Two implements Puzzle<number, string> {
  calculatePartOne():number {
    const calc = new ChecksumCalculator()
    return calc.calculateChecksum(parts)
  }

  calculatePartTwo():string {
    const comparer = new StringComparer()
    return comparer.findWordsThatDifferByOneLetter(parts)
  }
}