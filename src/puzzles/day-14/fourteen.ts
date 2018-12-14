import { Puzzle } from '../puzzle'
import { createNewRecipes, howManyRecipiesBefore } from './recipe-creator'

export class Fourteen implements Puzzle<string, number> {
  calculatePartOne(): string {
    return createNewRecipes(880751)
  }

  calculatePartTwo(): number {
    return howManyRecipiesBefore('880751')
  }
}