import { Puzzle } from '../puzzle'
import { playMarbles } from './marble-list'

export class Nine implements Puzzle<number, number> {
  calculatePartOne(): number {
    const scores = playMarbles(463 , 71787)
    return Math.max(...scores)
  }

  calculatePartTwo(): number {
    const scores = playMarbles(463 , 7178700)
    return Math.max(...scores)
  }
}