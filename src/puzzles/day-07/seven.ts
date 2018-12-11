import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { parseInstructions, timeInstructions } from './instruction-parser'

const instructions = FileReader.ReadFile(7, 'instructions')

export class Seven implements Puzzle<string, number> {
  calculatePartOne(): string {
    return parseInstructions(instructions).join('')
  }

  calculatePartTwo(): number {
    return timeInstructions(instructions, 5, 60)
  }
}