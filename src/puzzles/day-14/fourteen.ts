import { Puzzle } from '../puzzle'
import { createNewRecipes, howManyRecipiesBeforeArray } from './recipe-creator'

export class Fourteen implements Puzzle<string, number> {
  calculatePartOne(): string {
    return createNewRecipes(880751)
  }

  calculatePartTwo(): number {
    return howManyRecipiesBeforeArray('880751')
  }
}