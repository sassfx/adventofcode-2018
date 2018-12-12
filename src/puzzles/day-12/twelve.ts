import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { runPlantSimulation } from './plant-simulator'

export class Twelve implements Puzzle<number, number> {
  calculatePartOne(): number {
    const plantsText = FileReader.ReadFile(12, 'plants')
    return runPlantSimulation(plantsText, 10000)
  }

  calculatePartTwo(): number {
    return 2
  }
}