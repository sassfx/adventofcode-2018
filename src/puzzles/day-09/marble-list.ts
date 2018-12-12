export function playMarbles(numberOfPlayers:number, numberOfMarbles:number) {
  const players:number[] = Array.apply(null, new Array(numberOfPlayers)).map(x => 0)
  let playerIndex = 0
  const marbleList = new MarbleList()
  for(let i = 1; i <= numberOfMarbles; i++) {
    const score = marbleList.addMarble(i)
    players[playerIndex] += score
    playerIndex = (playerIndex + 1) % numberOfPlayers
  }

  return players
}

class MarbleNode {
  value:number
  previous:MarbleNode
  next:MarbleNode

  constructor(value:number) {
    this.value = value
  }
}

export class MarbleList {
  private currentMarble:MarbleNode

  constructor() {
    const marbleNode = new MarbleNode(0)
    marbleNode.next = marbleNode
    marbleNode.previous = marbleNode
    this.currentMarble = marbleNode
  }

  addMarble(marble:number) {
    if (marble % 23 === 0) {
      const marbleToRemove = this.getAntiClockwiseMarbleFromCurrentMarble(7)
      const left = marbleToRemove.previous
      const right = marbleToRemove.next

      left.next = right
      right.previous = left
      this.currentMarble = right

      return marble + marbleToRemove.value
    }
    else {
      this.insertNewMarble(marble)
      return 0
    }
  }

  insertNewMarble(marble:number) {
    const left = this.getClockwiseMarbleFromCurrentMarble(1)
    const right = this.getClockwiseMarbleFromCurrentMarble(2)

    const marbleNode = new MarbleNode(marble)
    marbleNode.previous = left
    marbleNode.next = right

    left.next = marbleNode
    right.previous = marbleNode

    this.currentMarble = marbleNode
  }

  getClockwiseMarbleFromCurrentMarble(steps:number) {
    let node = this.currentMarble
    for (let i = 0; i < steps; i++) {
      node = node.next
    }

    return node
  }

  getAntiClockwiseMarbleFromCurrentMarble(steps:number) {
    let node = this.currentMarble
    for (let i = 0; i < steps; i++) {
      node = node.previous
    }

    return node
  }
}