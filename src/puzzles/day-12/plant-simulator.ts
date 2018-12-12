import { textToArray, createArray } from '../../utils'
const initialStateRegex = /initial state: (?<initialState>[#.]+)/g
const ruleRegex = /(?<input>[#.]{5}) => (?<output>[#.])/g

class Rule {
  private readonly input:number
  private readonly value:number

  constructor(input:string[], nextValue:string) {
    const numeric = input.map((x, i) => x === '#' ? Math.pow(2, i) : 0)
    const total = numeric.reduce((agg, curr) => agg | curr, 0)
    this.input = total
    this.value = nextValue === '#' ? 1 : 0
  }

  match(input:number):boolean {
    return input === this.input
  }

  get next():number {
    return this.value
  }
}

class PlantState {
  private firstNode:PlantNode = null
  sum:number = 0

  constructor(initialState:string[]) {
    let index = 0
    let current = PlantNode.leftEnd
    let previous = PlantNode.leftEnd
    for (let state of initialState) {
      const numericState = state === '#' ? 1 : 0
      current = new PlantNode(index, numericState, true)
      current.left = previous
      previous.right = current

      if (numericState) {
        this.sum += index
      }

      if (this.firstNode === null) {
        this.firstNode = current
      }

      previous = current
      index++
    }
    current.right = PlantNode.rightEnd

    while (current.ruleValue !== 0) {
      current = new PlantNode(current.value + 1, 0, false)
      current.right = PlantNode.rightEnd
      current.left = previous
      previous.right = current

      previous = current
    }
    

    while (this.firstNode.ruleValue !== 0) {
      const currentFirst = this.firstNode
      this.firstNode = new PlantNode(this.firstNode.value -1, 0, false)
      this.firstNode.right = currentFirst
      this.firstNode.left = PlantNode.leftEnd
    }
  }

  step(rules:Rule[], noRuleValue:number = 0) {
    let newFirstNode = null
    let oldCurrent = this.firstNode
    let current = PlantNode.leftEnd
    let previous = PlantNode.leftEnd
    this.sum = 0
    while (oldCurrent !== PlantNode.rightEnd) {
      let next
      if (oldCurrent.check()) {
        for (let rule of rules) {
          next = oldCurrent.next(rule)
          if (next) {
            break;
          }
        }
        if (!next) {
          next = new PlantNode(oldCurrent.value, noRuleValue, false)
        }
      }
      else {
        next = oldCurrent
      }

      current = next
      current.left = previous
      previous.right = current
      previous = current

      if (newFirstNode === null) {
        newFirstNode = next
      }

      if (current.isAlive()) {
        this.sum += current.value
      }

      oldCurrent = oldCurrent.right
    }
    this.firstNode = newFirstNode
    current.right = PlantNode.rightEnd

    while (current.ruleValue !== 0) {
      current = new PlantNode(current.value + 1, 0, false)
      current.right = PlantNode.rightEnd
      current.left = previous
      previous.right = current

      previous = current
    }
    current.right = PlantNode.rightEnd

    while (this.firstNode.ruleValue !== 0) {
      const currentFirst = this.firstNode
      this.firstNode = new PlantNode(this.firstNode.value -1, 0, false)
      this.firstNode.right = currentFirst
      this.firstNode.left = PlantNode.leftEnd
    }
  }
}

class PlantNode {
  readonly plantValue:number
  readonly value:number
  readonly changedLastTick:boolean
  left:PlantNode
  right:PlantNode

  constructor(value:number, plantValue:number, changedLastTick:boolean) {
    this.value = value
    this.plantValue = plantValue
    this.changedLastTick = changedLastTick
  }

  next(rule:Rule):PlantNode {
    if (rule.match(this.ruleValue)) {
      return new PlantNode(this.value, rule.next, true)
    }

    return null
  }

  check():boolean {
    return this.left.left.changedLastTick || this.left.changedLastTick || this.changedLastTick || this.right.changedLastTick || this.right.right.changedLastTick
  }

  get ruleValue():number {
    return this.left.left.plantValue | 2 * this.left.plantValue | 4 * this.plantValue | 8 * this.right.plantValue | 16 * this.right.right.plantValue
  }


  isAlive() {
    return this.plantValue === 1
  }

  private static readonly leftEndNode = new PlantNode(-10000, 0, false)
  private static readonly rightEndNode = new PlantNode(-10000, 0, false)
  static get leftEnd():PlantNode {
    this.leftEndNode.left = this.leftEndNode
    return this.leftEndNode
  }

  static get rightEnd():PlantNode {
    this.rightEndNode.right = this.rightEndNode
    return this.rightEndNode
  }
}

export function runLongPlantSimulation(inputText:string, generations:number):number {
  const [initialState] = textToArray(inputText, initialStateRegex, ({ initialState }:{initialState:string}) => initialState.split(''))
  const rules = textToArray(inputText, ruleRegex, ({ input, output }) => new Rule(input.split(''), output))

  const state = new PlantState(initialState)

  let count = 0
  let lastSum = 0
  let differences:number[] = createArray(10, i => i)
  do {
    differences[count % differences.length] = state.sum - lastSum
    lastSum = state.sum
    state.step(rules)
    count++
  } while (!allSame(differences) && count < generations)

  const differencePerGeneration = differences[0]
  const extra = differencePerGeneration * (generations - count)

  return state.sum + extra
}

function allSame(array:number[]):boolean {
  const first = array[0]
  return array.filter(x => x !== first).length === 0
}

export function runPlantSimulation(inputText:string, generations:number):number {
  const [initialState] = textToArray(inputText, initialStateRegex, ({ initialState }:{initialState:string}) => initialState.split(''))
  const rules = textToArray(inputText, ruleRegex, ({ input, output }) => new Rule(input.split(''), output))

  const state = new PlantState(initialState)

  for (let i = 0; i++; i < generations) {
    state.step(rules)
  }

  return state.sum
}