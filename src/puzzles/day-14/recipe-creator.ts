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
      if (arrayCompare(inputValues, digits)) {
        return recipeCount - digits.length
      }
    }

    end.next = start
    first = first.advance()
    second = second.advance()
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