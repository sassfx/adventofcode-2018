import { Puzzle } from '../puzzle'
import { runRouteUntilFirstCrash } from './route-mapper'
import { FileReader } from '../../utils'

export class Thirteen implements Puzzle<string, number> {
  calculatePartOne(): string {
    const route = FileReader.ReadFile(13, 'route')
    const coord = runRouteUntilFirstCrash(route)
    return `${coord.x}, ${coord.y}`
  }

  calculatePartTwo(): number {
    return 2
  }
}