type TreeNode = {
  children: TreeNode[]
  metadata: number[]
}

export function sumNodeMetadata(input:number[]):number {
  const creator = new NodeCreator(input)
  const nodes = creator.createNodeList()
  let sum = 0
  for (let node of nodes) {
    for (let entry of node.metadata) {
      sum += entry
    }
  }

  return sum
}

export function calculateRootNodeValue(input:number[]) {
  const creator = new NodeCreator(input)
  const root = creator.getRootNode()
  return getNodeValue(root)
}

function getNodeValue(node:TreeNode):number {
  if (node.children.length === 0) {
    return node.metadata.reduce((a, b) => a + b, 0)
  }

  let value = 0
  for (let item of node.metadata) {
    const index = item - 1
    if (index >= 0 && index < node.children.length) {
      value += getNodeValue(node.children[index])
    }
  }

  return value
}

class NodeCreator {
  private readonly input:number[]
  private currentIndex = 0
  private nodeList:TreeNode[] = []

  constructor(input:number[]) {
    this.input = input
  }

  private getNextInputItem() {
    const item = this.input[this.currentIndex]
    this.currentIndex++
    return item    
  }

  private createNode(childCount:number, metadataCount:number):TreeNode {
    const children:TreeNode[] = []
    const metadata:number[] = []

    while (childCount > 0) {
      const childChildCount = this.getNextInputItem()
      const childMetadataCount = this.getNextInputItem()
      children.push(this.createNode(childChildCount, childMetadataCount))
      childCount--
    }

    while (metadataCount > 0) {
      const metadataItem = this.getNextInputItem()
      metadata.push(metadataItem)
      metadataCount--
    }

    const node = { children, metadata }
    this.nodeList.push(node)
    return node
  }

  createNodeList():TreeNode[] {
    const childCount = this.getNextInputItem()
    const metadataCount = this.getNextInputItem()
    this.createNode(childCount, metadataCount)

    return this.nodeList
  }

  getRootNode():TreeNode {
    const childCount = this.getNextInputItem()
    const metadataCount = this.getNextInputItem()
    return this.createNode(childCount, metadataCount)
  }
}
