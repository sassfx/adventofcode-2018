export function create2dArray<T>(xSize:number, ySize:number, valueFunction:(x:number, y:number)=>T):T[][] {
  return Array.apply(null, new Array(ySize + 1)).map((_, j) => Array.apply(null, new Array(xSize + 1)).map((_, i) => valueFunction(i, j)))
}