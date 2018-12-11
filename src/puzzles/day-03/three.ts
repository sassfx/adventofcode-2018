import { Puzzle } from '../puzzle'
import { ClaimCalculator } from './claim-calculator'
import { FileReader } from '../../utils'

const claims = FileReader.ReadFile(3, 'claims')
const calc = new ClaimCalculator()

export class Three implements Puzzle<number, number> {
  calculatePartOne():number {
    return calc.calculateOverlappingClaims(claims, 1000)
  }

  calculatePartTwo():number {
    return calc.getClaimWithNoOverlap(claims, 1000)
  }
}