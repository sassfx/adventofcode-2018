import { create2dArray } from '../../utils'

const regex = /#(?<idString>\d+)\s@\s(?<leftString>\d+),(?<topString>\d+):\s(?<widthString>\d+)x(?<heightString>\d+)/g

export class ClaimCalculator {
  calculateOverlappingClaims(claimString: string, size: number): number {
    const claims = getAllClaims(claimString)
    const claimSpace = createClaimSpace(claims, size)

    let count = 0
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (claimSpace[j][i] > 1) {
          count++
        }
      }
    }

    return count
  }

  getClaimWithNoOverlap(claimString: string, size:number):number {
    const claims = getAllClaims(claimString)
    const claimSpace = createClaimSpace(claims, size)

    for (let claim of claims) {
      if (!doesClaimOverlap(claim, claimSpace)) {
        return claim.id
      }
    }

    return 0
  }
}

function doesClaimOverlap(claim:Claim, claimSpace:number[][]):boolean {
  for (let i = claim.left; i < claim.left + claim.width; i++) {
    for (let j = claim.top; j < claim.top + claim.height; j++) {
      if (claimSpace[j][i] > 1) {
        return true
      }
    }
  }

  return false
}

function createClaimSpace(claims: Claim[], size: number):number[][] {
  const claimSpace = create2dArray(size, size, () => 0)

  for(let claim of claims) {
    for (let i = claim.left; i < claim.left + claim.width; i++) {
      for (let j = claim.top; j < claim.top + claim.height; j++) {
        claimSpace[j][i] += 1
      }
    }
  }

  return claimSpace
}

type Claim = {
  readonly id: number
  readonly left:number
  readonly top:number
  readonly width:number
  readonly height:number
}

function getAllClaims(claims:string):Claim[] {
  const result:Claim[] = [] 
  let match = regex.exec(claims)
  while (match) {
    const { idString, leftString, topString, widthString, heightString } = match.groups
    const id = parseInt(idString)
    const left = parseInt(leftString) 
    const top = parseInt(topString)
    const width = parseInt(widthString)
    const height = parseInt(heightString)

    result.push({ id, left, top, width, height})

    match = regex.exec(claims)
  }

  return result
}