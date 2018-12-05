import { Puzzle } from '../puzzle'
import { ClaimCalculator } from './claim-calculator'
import { FileReader } from '../../utils'

export class Three implements Puzzle<number, number> {
  calculatePartOne():number {
    const claims = FileReader.ReadFile('./puzzles/three/claims.txt')
    const calc = new ClaimCalculator()
    return calc.calculateOverlappingClaims(claims, 1000)
  }

  calculatePartTwo():number {
    const claims = FileReader.ReadFile('./puzzles/three/claims.txt')
    const calc = new ClaimCalculator()
    return calc.getClaimWithNoOverlap(claims, 1000)
  }
}