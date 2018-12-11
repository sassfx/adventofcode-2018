export class PolymerReactor {
  reactPolymer(input:string[]):string[] {
    const result:string[] = []

    for (let current of input) {
      const last = result.length > 0 ? result[result.length - 1] : ''
      if (canReact(last, current))
      {
        result.pop()
      }
      else {
        result.push(current)
      }
    }

    return result
  }
}

function canReact(first:string, second:string):boolean {
  return first.toUpperCase() === second.toUpperCase() && first !== second
}