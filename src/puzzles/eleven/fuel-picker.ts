export function calculatePowerLevel(x:number, y:number, serial:number):number {
  const rackId = x + 10
  let powerLevel = rackId * y
  powerLevel += serial
  powerLevel *= rackId
  powerLevel = Math.floor((powerLevel % 1000) / 100)
  return powerLevel - 5
}

function create2dArray(xSize:number, ySize:number, valueFunction:(x:number, y:number)=>number):number[][] {
  return Array.apply(null, new Array(ySize + 1)).map((_, j) => Array.apply(null, new Array(xSize + 1)).map((_, i) => valueFunction(i, j)))
}

export function getCellWithHighestFuel(xSize:number, ySize:number, serial:number):{ x:number, y:number } {
  const grid = create2dArray(xSize, ySize, (x, y) => calculatePowerLevel(x + 1, y + 1, serial))

  let highestSum = 0
  let x = 0
  let y = 0
  for (let j = 1; j < ySize - 1; j++) {
    for (let i = 1; i < xSize - 1; i++) {
      const sum = grid[j-1][i-1] + grid[j-1][i] + grid[j-1][i+1]
        + grid[j][i-1] + grid[j][i] + grid[j][i+1]
        + grid[j+1][i-1] + grid[j+1][i] + grid[j+1][i+1]

      if (sum > highestSum) {
        highestSum = sum
        x = i
        y = j
      }
    }
  }

  return { x, y }
}

type GridValue = {
  x:number,
  y:number,
  size:number,
  value:number,
}

export function getCellOfAnySizeWithHighestPower(xSize:number, ySize:number, serial:number):{ x:number, y:number, size:number } {
  const grid = create2dArray(xSize, ySize, (x, y) => calculatePowerLevel(x + 1, y + 1, serial))

  let gridValues:GridValue[] = []
  for (let j = 0; j < ySize; j++) {
    for (let i = 0; i < xSize; i++) {
      gridValues.push({ x: i + 1, y: j + 1, size: 1, value:grid[j][i] })
    }
  }

  let highestValue:GridValue = { x:0, y:0, size:0, value: 0 }

  while (gridValues.length > 0) {
    let newGridValues:GridValue[] = []
    for(let value of gridValues) {
      const xMin = value.x - 1 
      const xMax = xMin + value.size
      const yMin = value.y - 1
      const yMax = yMin + value.size

      if (yMax >= ySize || xMax >= xSize) {
        continue
      }

      const newSize = value.size + 1
      let newValue = value.value

      for (let j = yMin; j <= yMax; j++) {
        newValue += grid[j][xMax]
      }

      for (let i = xMin; i <= xMax; i++) {
        newValue += grid[yMax][i]
      }

      const updatedGridValue = { x: value.x, y: value.y, size: newSize, value: newValue }

      if (updatedGridValue.value > highestValue.value) {
        highestValue = updatedGridValue
      }

      newGridValues.push(updatedGridValue)
    }
    gridValues = newGridValues
  }

  return highestValue
}