import { Puzzle } from '../puzzle'
import { FileReader } from '../../utils'
import { PolymerReactor } from './polymer-reactor'



export class Five implements Puzzle<number, number> {
  calculatePartOne():number {
    const polymer = FileReader.ReadFile(5, 'polymer').split('')
    const reactor = new PolymerReactor()
    const reacted = reactor.reactPolymer(polymer)
    return reacted.length
  }

  calculatePartTwo():number {
    const polymerString = FileReader.ReadFile(5, 'polymer')
    const reactor = new PolymerReactor()
    const lengths = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => {
      const polymer = polymerString.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '').split('')
      return reactor.reactPolymer(polymer).length
    })

    return Math.min(...lengths)
  }
}