import { Puzzle } from '../puzzle'
import { runRouteUntilFirstCrash, runRouteUntilOnlyOneCartLeft } from './route-mapper'
import { FileReader } from '../../utils'

export class Thirteen implements Puzzle<string, string> {
  calculatePartOne(): string {
    const route = FileReader.ReadFile(13, 'route')
    const coord = runRouteUntilFirstCrash(route)
    return `${coord.x}, ${coord.y}`
  }

  calculatePartTwo(): string {
    const route = FileReader.ReadFile(13, 'route')
    const coord = runRouteUntilOnlyOneCartLeft(route)
    return `${coord.x}, ${coord.y}`
  }
}