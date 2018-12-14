class Recipe {
  next:Recipe
  value:number
  index:number

  constructor(value:number, index:number) {
    this.value = value
    this.index = index
  }

  advance() {
    let result:Recipe = this.next
    for (let i = 0; i < this.value; i++) {
      result = result.next
    }
    
    return result
  }
}

export function createNewRecipes(numberToCreate:number):string {
  let first = new Recipe(3, 0)
  let second = new Recipe(7, 1)

  let start = first
  let end = second
  let recipeCount = 2

  first.next = second
  second.next = first

  const digits:number[] = []
  while (recipeCount <= numberToCreate + 10) {
    const newValue = first.value + second.value
    const values = newValue.toString().split('').map(x => parseInt(x))
    for (let value of values) {
      const newRecipe = new Recipe(value, recipeCount)
      end.next = newRecipe
      end = newRecipe
      recipeCount++

      if (recipeCount > numberToCreate && digits.length < 10) {
        digits.push(value)
      }
    }
    end.next = start
    first = first.advance()
    second = second.advance()
  }

  return digits.join('')
}

export function howManyRecipiesBefore(input:string):number {
  let first = new Recipe(3, 0)
  let second = new Recipe(7, 1)

  let start = first
  let end = second
  let recipeCount = 2

  first.next = second
  second.next = first

  const inputValues = input.toString().split('').map(x => parseInt(x))
  const digits:number[] = []
  while (true) {
    const newValue = first.value + second.value
    const values = newValue.toString().split('').map(x => parseInt(x))
    for (let value of values) {
      const newRecipe = new Recipe(value, recipeCount)
      end.next = newRecipe
      end = newRecipe
      recipeCount++

      if (digits.length === input.length) {
        digits.shift()
      }
      digits.push(value)
    }

    if (arrayCompare(inputValues, digits)) {
      return recipeCount - digits.length
    }

    if (first.index < recipeCount - 1000000 && first.index < recipeCount - 1000000) {
      start = null
    }
    else {
      end.next = start
    }

    first = first.advance()
    second = second.advance()
  }
}

const maxSize = 100000000
class GrowingArray {
  arrays:number[][]
  currentArrayIndex = 0
  private _length:number = 0

  constructor() {
    const first:number[] = []
    this.arrays = [first]
  }

  push(item) {
    const currentArray = this.arrays[this.currentArrayIndex]
    if (currentArray.length >= maxSize) {
      const next:number[] = [item]
      this.arrays.push(next)
      this.currentArrayIndex++
    }
    else {
      currentArray.push(item)
    }

    this._length++
  }

  get(index) {
    const arrayIndex = Math.floor(index / maxSize)
    return this.arrays[arrayIndex][index - maxSize * arrayIndex]
  }

  get length() {
    return this._length
  }
}

export function howManyRecipiesBeforeArray(input:string):number {
  let first = 0
  let second = 1

  let recipes = new GrowingArray()
  recipes.push(3)
  recipes.push(7)

  const inputValues = input.toString().split('').map(x => parseInt(x))
  const digits:number[] = []
  while (true) {
    const firstValue = recipes.get(first)
    const secondValue = recipes.get(second)
    const newValue = firstValue + secondValue
    const values = newValue.toString().split('').map(x => parseInt(x))
    for (let value of values) {
      recipes.push(value)

      if (digits.length === input.length) {
        digits.shift()
      }
      digits.push(value)
    }

    if (arrayCompare(inputValues, digits)) {
      return recipes.length - digits.length
    }

    first = (first + firstValue + 1) % recipes.length
    second = (second + secondValue + 1) % recipes.length
  }
}

function arrayCompare(first:number[], second:number[]):boolean {
  if (first.length !== second.length) {
    return false
  }  

  for(let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      return false
    }
  }

  return true
}