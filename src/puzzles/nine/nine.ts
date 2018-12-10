import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'

const nodesText = FileReader.ReadFile('./puzzles/eight/nodes.txt')
const input = nodesText.split(' ').map(x => parseInt(x.trim()))

export class Nine implements Puzzle<number, number> {
  calculatePartOne(): number {
    return 1
  }

  calculatePartTwo(): number {
    return 2
  }
}