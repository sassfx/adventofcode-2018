import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { sumNodeMetadata, calculateRootNodeValue } from './node'

const nodesText = FileReader.ReadFile('./puzzles/eight/nodes.txt')
const input = nodesText.split(' ').map(x => parseInt(x.trim()))

export class Eight implements Puzzle<number, number> {
  calculatePartOne(): number {
    return sumNodeMetadata(input)
  }

  calculatePartTwo(): number {
    return calculateRootNodeValue(input)
  }
}