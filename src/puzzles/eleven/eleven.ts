import { Puzzle } from '../puzzle'
import { getCellWithHighestFuel, getCellOfAnySizeWithHighestPower } from './fuel-picker'

export class Eleven implements Puzzle<string, string> {
  calculatePartOne(): string {
    const cell = getCellWithHighestFuel(300, 300, 9435)
    return `${cell.x},${cell.y}`
  }

  calculatePartTwo(): string {
    const cell = getCellOfAnySizeWithHighestPower(300, 300, 9435)
    return `${cell.x},${cell.y},${cell.size}`
  }
}