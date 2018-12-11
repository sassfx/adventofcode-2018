const stepRegex = /Step (?<requirement>\w) must be finished before step (?<dependant>\w)/g

interface Dependencies {
  [node: string]: string[]
}

export function timeInstructions(instructionString:string, numWorkers:number, extraTime:number):number {
  let match = stepRegex.exec(instructionString)

  let free:string[] = []
  let blocked:string[] = []
  let all:string[] = []
  const dependencies:Dependencies = {}

  while (match) {
    const { requirement, dependant } = match.groups

    if (all.indexOf(dependant) < 0) {
      all.push(dependant)
    }

    if (all.indexOf(requirement) < 0) {
      all.push(requirement)
    }

    if (blocked.indexOf(requirement) < 0 && free.indexOf(requirement) < 0) {
      free.push(requirement)
    }

    if (free.indexOf(dependant) > -1) {
      free = free.filter(x => x !== dependant)
    }

    if (blocked.indexOf(dependant) < 0) {
      blocked.push(dependant)
    }

    const currentDependencies = dependencies[dependant] || []
    currentDependencies.push(requirement)
    dependencies[dependant] = currentDependencies

    match = stepRegex.exec(instructionString)
  }

  const completed:string[] = []
  let time = -1
  const workers:Worker[] = []
  for (let i = 1; i <= numWorkers; i++) {
    workers.push(new Worker())
  }

  while (completed.length < all.length) {
    blocked = blocked.filter(x => free.indexOf(x) === -1)
    for (let worker of workers) {
      worker.tick()

      if (worker.done() && worker.node) {
        completed.push(worker.node)
        worker.node = undefined
      }
    }

    for (let node of Object.keys(dependencies)) {
      const nodeDependencies = dependencies[node]
      if (isNodeFree(nodeDependencies, completed)) {
        free.push(node)
        delete dependencies[node]
      }
    }

    free = free.filter(x => completed.indexOf(x) === -1)
    free = free.sort()
    for (let node of free) {
      const worker = workers.find(x => x.done())
      if (worker) {
        worker.newWork(node, extraTime)
        free = free.filter(x => x !== node)
      }
    }

    time++
  }

  return time
}

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('').map(x => x.toUpperCase())
class Worker {
  node:string
  private time:number = 0

  newWork(node:string, extraTime:number) {
    this.node = node
    this.time = extraTime + letters.indexOf(node) + 1
  }

  tick() {
    if (this.time > 0) {
      this.time -= 1
    }
  }

  done() {
    return this.time === 0
  }
}

export function parseInstructions(instructionString:string):string[] {
  let match = stepRegex.exec(instructionString)

  let free:string[] = []
  let blocked:string[] = []
  const dependencies:Dependencies = {}

  while (match) {
    const { requirement, dependant } = match.groups

    if (blocked.indexOf(requirement) < 0) {
      free.push(requirement)
    }

    if (free.indexOf(dependant) > -1) {
      free = free.filter(x => x !== dependant)
    }

    if (blocked.indexOf(dependant) < 0) {
      blocked.push(dependant)
    }

    const currentDependencies = dependencies[dependant] || []
    currentDependencies.push(requirement)
    dependencies[dependant] = currentDependencies

    match = stepRegex.exec(instructionString)
  }

  const completed:string[] = []
  while (blocked.length > 0) {
    blocked = blocked.filter(x => free.indexOf(x) === -1)

    free = free.sort()
    const done = free[0]
    completed.push(done)

    free = free.filter(x => done.indexOf(x) === -1)

    for (let node of Object.keys(dependencies)) {
      const nodeDependencies = dependencies[node]
      if (isNodeFree(nodeDependencies, completed)) {
        free.push(node)
        delete dependencies[node]
      }
    }
  }

  return completed
}

function isNodeFree(nodeDependencies:string[], doneNodes:string[]) {
  for (let dependency of nodeDependencies) {
    if (doneNodes.indexOf(dependency) < 0) {
      return false
    }
  }  

  return true
}