import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { runPlantSimulation, runLongPlantSimulation } from './plant-simulator'

export class Twelve implements Puzzle<number, number> {
  calculatePartOne(): number {
    const plantsText = FileReader.ReadFile(12, 'plants')
    return runPlantSimulation(plantsText, 20)
  }

  calculatePartTwo(): number {
    const plantsText = FileReader.ReadFile(12, 'plants')
    return runLongPlantSimulation(plantsText, 50000000000)
  }
}