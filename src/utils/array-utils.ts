export function createArray<T> (size:number, valueFunction:(x:number)=>T):T[] {
  return Array.apply(null, new Array(size + 1)).map((_, i) => valueFunction(i))
}

export function create2dArray<T>(xSize:number, ySize:number, valueFunction:(x:number, y:number)=>T):T[][] {
  return createArray(ySize, j => createArray(xSize, i => valueFunction(i, j)))
}

export const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')