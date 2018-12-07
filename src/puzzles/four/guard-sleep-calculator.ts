import { InstructionTimeStamp } from './instruction-timestamp'

const instructionRegex = /\[(?<timestamp>.+)\](?<instruction>.+)/g
const guardRegex = /Guard #(?<guardString>\d+) begins shift/g

export class GuardSleepCalculator {
  calculateStrategyOne(guardRecords:string):number {
    const guardSleepRecords = getGuardSleepRecords(guardRecords)

    let sleepiestGuard = 0 
    let totalMinutesAsleep = 0
    for(let guardId of Object.keys(guardSleepRecords)) {
      const record = guardSleepRecords[parseInt(guardId)]
      if (record.length > totalMinutesAsleep) {
        sleepiestGuard = parseInt(guardId)
        totalMinutesAsleep = record.length
      } 
    }
    const mostSleepyMinute = findMode(guardSleepRecords[sleepiestGuard])

    return sleepiestGuard * mostSleepyMinute
  }

  calculateStrategyTwo(guardRecords:string):number {
    const guardSleepRecords = getGuardSleepRecords(guardRecords)

    let sleepiestGuard = 0 
    let highestMinuteSleepCount = 0
    for(let guardId of Object.keys(guardSleepRecords)) {
      const record = guardSleepRecords[parseInt(guardId)]
      if (findModeCount(record) > highestMinuteSleepCount) {
        sleepiestGuard = parseInt(guardId)
        highestMinuteSleepCount = findModeCount(record)
      }
    }
    
    const mostSleepyMinute = findMode(guardSleepRecords[sleepiestGuard])
    return sleepiestGuard * mostSleepyMinute
  }
}

function getGuardSleepRecords(guardRecords:string):GuardSleepRecords {
  const sortedRecords = parseRecords(guardRecords).sort((a, b) => a.timestamp.compare(b.timestamp))

  let currentGuard = 0
  let lastTimeWentToSleep:InstructionTimeStamp
  const guardSleepRecords:GuardSleepRecords = {}
  for (let record of sortedRecords) {
    const { timestamp, instruction } = record

    if (instruction === 'falls asleep') {
      lastTimeWentToSleep = timestamp
    }
    else if (instruction === 'wakes up') {
      const asleepTime = Array(timestamp.minute - lastTimeWentToSleep.minute).fill(0).map((x, i) => i + lastTimeWentToSleep.minute) 
      guardSleepRecords[currentGuard] = guardSleepRecords[currentGuard].concat(asleepTime)
    }
    else {
      const match = guardRegex.exec(instruction)
      const { guardString } = match.groups
      currentGuard = parseInt(guardString)

      if (!guardSleepRecords[currentGuard]) {
        guardSleepRecords[currentGuard] = []
      }

      guardRegex.lastIndex = -1
    }
  }

  return guardSleepRecords
}

interface GuardSleepRecords {
  [guardId: number]: number[]
}

type Record = {
  readonly timestamp:InstructionTimeStamp
  readonly instruction:string
}

function parseRecords(guardRecords:string):Record[] {
  const records:Record[] = []
  let match = instructionRegex.exec(guardRecords)
  while (match) {
    const { timestamp, instruction } = match.groups
    records.push({ timestamp: new InstructionTimeStamp(timestamp), instruction: instruction.trim() })
    match = instructionRegex.exec(guardRecords)
  }

  return records
}

function findMode(numbers:number[]):number {
  let counted = numbers.reduce((acc, curr) => { 
      if (curr in acc) {
          acc[curr]++
      } else {
          acc[curr] = 1
      }

      return acc
  }, {})

  let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b)

  return parseInt(mode)
}

function findModeCount(numbers:number[]):number {
  if (numbers.length === 0) {
    return 0
  }

  let counted = numbers.reduce((acc, curr) => { 
    if (curr in acc) {
        acc[curr]++
    } else {
        acc[curr] = 1
    }

    return acc
  }, {})

  let modeCount = Object.keys(counted).reduce((acc, curr) => acc > counted[curr] ? acc : counted[curr])

  return parseInt(modeCount)
}