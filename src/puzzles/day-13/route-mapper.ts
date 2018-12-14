import { create2dArray } from '../../utils'

enum IntersectionDirection {
  Left = 0,
  Straight = 1,
  Right = 2,
}

class Cart {
  previousNode:IRouteNode
  currentNode:IRouteNode
  nextIntersectionDirection:IntersectionDirection

  constructor(node:IRouteNode, previousNode:IRouteNode) {
    this.currentNode = node
    this.previousNode = previousNode
    this.nextIntersectionDirection = IntersectionDirection.Left
  }

  next() {
    const result = this.currentNode.advance(this)
    this.previousNode = this.currentNode
    this.currentNode = result.nextNode
    this.nextIntersectionDirection = result.nextIntersectionDirection
  }
}

interface IRouteNode {
  x:number
  y:number
  advance(cart:Cart):{ nextNode:IRouteNode, nextIntersectionDirection:IntersectionDirection }
}

class HorizontalPathNode implements IRouteNode {
  x:number
  y:number
  leftNode:IRouteNode
  rightNode:IRouteNode

  advance(cart:Cart):{ nextNode:IRouteNode, nextIntersectionDirection:IntersectionDirection } {
    if (cart.previousNode === this.leftNode) {
      return { nextNode: this.rightNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    if (cart.previousNode === this.rightNode) {
      return { nextNode: this.leftNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    return null
  }
}

class VerticalPathNode implements IRouteNode {
  x:number
  y:number
  upNode:IRouteNode
  downNode:IRouteNode

  advance(cart:Cart):{ nextNode:IRouteNode, nextIntersectionDirection:IntersectionDirection } {
    if (cart.previousNode === this.upNode) {
      return { nextNode: this.downNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    if (cart.previousNode === this.downNode) {
      return { nextNode: this.upNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    return null
  }
}

class TurnNode implements IRouteNode {
  x:number
  y:number
  horizontalNode:IRouteNode
  verticalNode:IRouteNode

  advance(cart:Cart):{ nextNode:IRouteNode, nextIntersectionDirection:IntersectionDirection } {
    if (cart.previousNode === this.horizontalNode) {
      return { nextNode: this.verticalNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    if (cart.previousNode === this.verticalNode) {
      return { nextNode: this.horizontalNode, nextIntersectionDirection: cart.nextIntersectionDirection }
    }

    return null
  }
}

class IntersectionNode implements IRouteNode {
  x:number
  y:number
  leftNode:IRouteNode
  rightNode:IRouteNode
  upNode:IRouteNode
  downNode:IRouteNode

  advance(cart:Cart):{ nextNode:IRouteNode, nextIntersectionDirection:IntersectionDirection } {
    if (cart.nextIntersectionDirection === IntersectionDirection.Left) {
      if (cart.previousNode === this.leftNode) {
        return { nextNode: this.upNode, nextIntersectionDirection: IntersectionDirection.Straight }
      }

      if (cart.previousNode === this.rightNode) {
        return { nextNode: this.downNode, nextIntersectionDirection: IntersectionDirection.Straight }
      }

      if (cart.previousNode === this.upNode) {
        return { nextNode: this.rightNode, nextIntersectionDirection: IntersectionDirection.Straight }
      }

      if (cart.previousNode === this.downNode) {
        return { nextNode: this.leftNode, nextIntersectionDirection: IntersectionDirection.Straight }
      }
    }

    if (cart.nextIntersectionDirection === IntersectionDirection.Straight) {
      if (cart.previousNode === this.leftNode) {
        return { nextNode: this.rightNode, nextIntersectionDirection: IntersectionDirection.Right }
      }

      if (cart.previousNode === this.rightNode) {
        return { nextNode: this.leftNode, nextIntersectionDirection: IntersectionDirection.Right }
      }

      if (cart.previousNode === this.upNode) {
        return { nextNode: this.downNode, nextIntersectionDirection: IntersectionDirection.Right }
      }

      if (cart.previousNode === this.downNode) {
        return { nextNode: this.upNode, nextIntersectionDirection: IntersectionDirection.Right }
      }
    }

    if (cart.nextIntersectionDirection === IntersectionDirection.Right) {
      if (cart.previousNode === this.leftNode) {
        return { nextNode: this.downNode, nextIntersectionDirection: IntersectionDirection.Left }
      }

      if (cart.previousNode === this.rightNode) {
        return { nextNode: this.upNode, nextIntersectionDirection: IntersectionDirection.Left }
      }

      if (cart.previousNode === this.upNode) {
        return { nextNode: this.leftNode, nextIntersectionDirection: IntersectionDirection.Left }
      }

      if (cart.previousNode === this.downNode) {
        return { nextNode: this.rightNode, nextIntersectionDirection: IntersectionDirection.Left }
      }
    }

    return null
  }
}

function createNode(xIndex:number, yIndex:number, inputGrid:string[][], routeGrid:IRouteNode[][], carts:Cart[]):IRouteNode {
  if (yIndex < 0 || yIndex >= inputGrid.length) {
    return null
  }

  if (xIndex < 0 || xIndex >= inputGrid[yIndex].length) {
    return null
  }

  if (inputGrid[yIndex][xIndex] === '') {
    return null
  }

  if (routeGrid[yIndex][xIndex]) {
    return routeGrid[yIndex][xIndex]
  }

  const token = inputGrid[yIndex][xIndex]
  switch (token) {
    case '-':
    case '>':
    case '<':
      let horizontal = new HorizontalPathNode()
      horizontal.x = xIndex
      horizontal.y = yIndex
      routeGrid[yIndex][xIndex] = horizontal
      horizontal.leftNode = createNode(xIndex - 1, yIndex, inputGrid, routeGrid, carts)
      horizontal.rightNode = createNode(xIndex + 1, yIndex, inputGrid, routeGrid, carts)

      if (token === '>') {
        const leftRightCart = new Cart(horizontal, horizontal.leftNode)
        carts.push(leftRightCart)
      }
      
      if (token === '<') {
        const rightLeftCart = new Cart(horizontal, horizontal.rightNode)
        carts.push(rightLeftCart)
      }

      return horizontal
    case '|':
    case '^':
    case 'v':
      let vertical = new VerticalPathNode()
      routeGrid[yIndex][xIndex] = vertical
      vertical.x = xIndex
      vertical.y = yIndex
      vertical.upNode = createNode(xIndex, yIndex - 1, inputGrid, routeGrid, carts)
      vertical.downNode = createNode(xIndex, yIndex + 1, inputGrid, routeGrid, carts)

      if (token === '^') {
        const downUpCart = new Cart(vertical, vertical.downNode)
        carts.push(downUpCart)
      }
      
      if (token === 'v') {
        const upDownCart = new Cart(vertical, vertical.upNode)
        carts.push(upDownCart)
      }

      return vertical
    case '/':
    case '\\':
      let turn = new TurnNode()
      routeGrid[yIndex][xIndex] = turn
      turn.x = xIndex
      turn.y = yIndex
      let horizontalNode = createNode(xIndex - 1, yIndex, inputGrid, routeGrid, carts)
      if (!(horizontalNode instanceof HorizontalPathNode) && !(horizontalNode instanceof IntersectionNode)) {
        horizontalNode = createNode(xIndex + 1, yIndex, inputGrid, routeGrid, carts)
      }

      let verticalNode = createNode(xIndex, yIndex - 1, inputGrid, routeGrid, carts)
      if (!(verticalNode instanceof VerticalPathNode) && !(verticalNode instanceof IntersectionNode)) {
        verticalNode = createNode(xIndex, yIndex + 1, inputGrid, routeGrid, carts)
      }

      turn.horizontalNode = horizontalNode
      turn.verticalNode = verticalNode
      return turn
    case '+':
      let intersection = new IntersectionNode()
      routeGrid[yIndex][xIndex] = intersection
      intersection.x = xIndex
      intersection.y = yIndex

      intersection.leftNode = createNode(xIndex - 1, yIndex, inputGrid, routeGrid, carts)
      intersection.rightNode = createNode(xIndex + 1, yIndex, inputGrid, routeGrid, carts)
      intersection.upNode = createNode(xIndex, yIndex - 1, inputGrid, routeGrid, carts)
      intersection.downNode = createNode(xIndex, yIndex + 1, inputGrid, routeGrid, carts)
      return intersection
  }
}

function parseRoute(input:string):Cart[] {
  const inputGrid:string[][] = input.split('\n').map(line => line.split(''))
  const routeGrid:IRouteNode[][] = create2dArray(inputGrid.length, inputGrid[0].length, () => null)

  const initialY = 0 
  const initialX = inputGrid[0].findIndex(x => x !== ' ')

  const carts:Cart[] = []
  createNode(initialX, initialY, inputGrid, routeGrid, carts)

  return carts
}

function iterateRoute(input:string):Cart[] {
  const inputGrid:string[][] = input.split('\n').map(line => line.split(''))
  const routeGrid:IRouteNode[][] = create2dArray(inputGrid.length, inputGrid[0].length, () => null)

  const carts:Cart[] = []

  for (let j = 0; j < inputGrid.length; j++) {
    const row = inputGrid[j]

    for (let i = 0; i < row.length; i++) {
      const token = row[i]
      let node:IRouteNode = null
      switch(token) {
        case '-':
        case '>':
        case '<':
          node = new HorizontalPathNode()
          break;
        case '|':
        case '^':
        case 'v':
          node = new VerticalPathNode()
          break;
        case '/':
        case '\\':
          node = new TurnNode()
          break;
        case '+':
          node = new IntersectionNode()
          break;
      }

      if (node) {
        node.x = i
        node.y = j
        routeGrid[j][i] = node
      }
    }
  }

  for (let j = 0; j < routeGrid.length; j++) {
    const row = routeGrid[j]

    for (let i = 0; i < row.length; i++) {
      const node = row[i]

      if (node instanceof HorizontalPathNode) {
        const horizontal = node as HorizontalPathNode
        horizontal.leftNode = row[i - 1]
        horizontal.rightNode = row[i + 1]

        const token = inputGrid[j][i]
        if (token === '>') {
          const leftRightCart = new Cart(horizontal, horizontal.leftNode)
          carts.push(leftRightCart)
        }
        
        if (token === '<') {
          const rightLeftCart = new Cart(horizontal, horizontal.rightNode)
          carts.push(rightLeftCart)
        }
      }

      if (node instanceof VerticalPathNode) {
        const vertical = node as VerticalPathNode
        vertical.downNode = routeGrid[j + 1][i]
        vertical.upNode = routeGrid[j - 1][i]

        const token = inputGrid[j][i]
        if (token === '^') {
          const downUpCart = new Cart(vertical, vertical.downNode)
          carts.push(downUpCart)
        }
        
        if (token === 'v') {
          const upDownCart = new Cart(vertical, vertical.upNode)
          carts.push(upDownCart)
        }
      }

      if (node instanceof TurnNode) {
        const turn = node as TurnNode

        let horizontal = routeGrid[j][i - 1]
        if (!(horizontal instanceof HorizontalPathNode) && !(horizontal instanceof IntersectionNode)) {
          horizontal = routeGrid[j][i + 1]
        }

        let vertical = routeGrid[j - 1] ? routeGrid[j - 1][i] : null
        if (!(vertical instanceof VerticalPathNode) && !(vertical instanceof IntersectionNode)) {
          vertical = routeGrid[j + 1][i]
        }

        turn.horizontalNode = horizontal
        turn.verticalNode = vertical
      }

      if (node instanceof IntersectionNode) {
        const intersection = node as IntersectionNode
        intersection.leftNode = row[i - 1]
        intersection.rightNode = row[i + 1]
        intersection.downNode = routeGrid[j + 1][i]
        intersection.upNode = routeGrid[j - 1][i]
      }
    }
  }

  return carts
}


export function runRouteUntilFirstCrash(input:string):{x:number, y:number} {
  const carts = iterateRoute(input)
  let collision = null
  let count = 0

  while (!collision) {
    for (let cart of carts) {
      cart.next()
      const others = carts.filter(x => x.currentNode === cart.currentNode)
      if (others.length > 1) {
        collision = cart.currentNode
        break;
      }
    }
    count++
    carts.sort((a, b) => {
      if (a.currentNode.y === b.currentNode.y) {
        return a.currentNode.x - b.currentNode.x
      }

      return a.currentNode.y - b.currentNode.y
    })
  }

  return { x: collision.x, y: collision.y}
}

export function runRouteUntilOnlyOneCartLeft(input:string):{x:number, y:number} {
  let carts = iterateRoute(input)

  while (carts.length > 1) {
    let deadCarts:Cart[] = []
    for (let cart of carts) {
        cart.next()
        const others = carts.filter(x => x.currentNode === cart.currentNode)
        if (others.length > 1) {
          deadCarts = deadCarts.concat(others)
        }
    }
    carts = carts.filter(x => deadCarts.indexOf(x) === -1)
    carts.sort((a, b) => {
      if (a.currentNode.y === b.currentNode.y) {
        return a.currentNode.x - b.currentNode.x
      }

      return a.currentNode.y - b.currentNode.y
    })
  }

  return { x: carts[0].currentNode.x, y: carts[0].currentNode.y}
}