import { textToArray } from '../../utils'
const initialStateRegex = /initial state: (?<initialState>[#.]+)/g
const ruleRegex = /(?<input>[#.]{5}) => (?<output>[#.])/g

class Rule {
  private readonly input:string
  private readonly nextValue:string

  constructor(input:string, nextValue:string) {
    this.input = input
    this.nextValue = nextValue 
  }

  match(input:string):boolean {
    return input === this.input
  }

  get next():string {
    return this.nextValue
  }
}

class PlantState {
  private firstNode:PlantNode = null

  constructor(initialState:string[]) {
    let index = 0
    let current = PlantNode.leftEnd
    let previous = PlantNode.leftEnd
    for (let state of initialState) {
      current = new PlantNode(index, state, true)
      current.left = previous
      previous.right = current

      if (this.firstNode === null) {
        this.firstNode = current
      }

      previous = current
      index++
    }
    current.right = PlantNode.rightEnd

    while (current.ruleString !== '.....') {
      current = new PlantNode(current.value + 1, PlantNode.dead, false)
      current.right = PlantNode.rightEnd
      current.left = previous
      previous.right = current

      previous = current
    }
    

    while (this.firstNode.ruleString !== '.....') {
      const currentFirst = this.firstNode
      this.firstNode = new PlantNode(this.firstNode.value -1, PlantNode.dead, false)
      this.firstNode.right = currentFirst
      this.firstNode.left = PlantNode.leftEnd
    }
  }

  step(rules:Rule[]) {
    let newFirstNode = null
    let oldCurrent = this.firstNode
    let current = PlantNode.leftEnd
    let previous = PlantNode.leftEnd

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
          next = new PlantNode(oldCurrent.value, PlantNode.dead, false)
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

      oldCurrent = oldCurrent.right
    }
    this.firstNode = newFirstNode
    current.right = PlantNode.rightEnd

    while (current.ruleString !== '.....') {
      current = new PlantNode(current.value + 1, PlantNode.dead, false)
      current.right = PlantNode.rightEnd
      current.left = previous
      previous.right = current

      previous = current
    }
    current.right = PlantNode.rightEnd

    while (this.firstNode.ruleString !== '.....') {
      const currentFirst = this.firstNode
      this.firstNode = new PlantNode(this.firstNode.value -1, PlantNode.dead, false)
      this.firstNode.right = currentFirst
      this.firstNode.left = PlantNode.leftEnd
    }
  }

  sum():number {
    let current = this.firstNode
    let sum = 0
    while (current !== PlantNode.rightEnd) {
      if (current.isAlive()) {
        sum += current.value
      }

      current = current.right
    }

    return sum
  }

  alive():number[] {
    let current = this.firstNode
    let parts:number[] = []
    while (current !== PlantNode.rightEnd) {
      if (current.isAlive()) {
        parts.push(current.value)
      }

      current = current.right
    }

    return parts
  }
}

class PlantNode {
  readonly plantValue:string
  readonly value:number
  readonly changedLastTick:boolean
  left:PlantNode
  right:PlantNode

  constructor(value:number, plantValue:string, changedLastTick:boolean) {
    this.value = value
    this.plantValue = plantValue
    this.changedLastTick = changedLastTick
  }

  next(rule:Rule):PlantNode {
    if (rule.match(this.ruleString)) {
      return new PlantNode(this.value, rule.next, true)
    }

    return null
  }

  check():boolean {
    return this.left.left.changedLastTick || this.left.changedLastTick || this.changedLastTick || this.right.changedLastTick || this.right.right.changedLastTick
  }

  get ruleString() {
    return [this.left.left.plantValue, this.left.plantValue, this.plantValue, this.right.plantValue, this.right.right.plantValue].join('')
  }

  static readonly alive:string = '#'
  static readonly dead:string = '.'

  isAlive() {
    return this.plantValue === PlantNode.alive
  }

  private static readonly leftEndNode = new PlantNode(-10000, PlantNode.dead, false)
  private static readonly rightEndNode = new PlantNode(-10000, PlantNode.dead, false)
  static get leftEnd():PlantNode {
    this.leftEndNode.left = this.leftEndNode
    return this.leftEndNode
  }

  static get rightEnd():PlantNode {
    this.rightEndNode.right = this.rightEndNode
    return this.rightEndNode
  }
}

export function runPlantSimulation(inputText:string, generations:number):number {
  const [initialState] = textToArray(inputText, initialStateRegex, ({ initialState }:{initialState:string}) => initialState.split(''))
  const rules = textToArray(inputText, ruleRegex, ({ input, output }) => new Rule(input, output))

  const state = new PlantState(initialState)

  for (let i = 0; i < generations; i++) {
    state.step(rules)
    if (i % 100 === 0) {
      console.log(i)
    }
  }

  return state.sum()
}