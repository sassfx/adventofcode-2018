import { createNewRecipes, howManyRecipiesBeforeArray } from './recipe-creator'

describe('RecipeCreator', () => {
  describe('createNewRecipes', () => {
    it('creates correct recipes', () => {
      expect(createNewRecipes(5)).toBe('0124515891')
      expect(createNewRecipes(18)).toBe('9251071085')
      expect(createNewRecipes(2018)).toBe('5941429882')
    })
  })

  describe('howManyRecipiesBefore', () => {
    it('calculates correct numbers', () => {
      expect(howManyRecipiesBeforeArray('51589')).toBe(9)
      expect(howManyRecipiesBeforeArray('01245')).toBe(5)
      expect(howManyRecipiesBeforeArray('92510')).toBe(18)
      expect(howManyRecipiesBeforeArray('59414')).toBe(2018)
    })
  })
})