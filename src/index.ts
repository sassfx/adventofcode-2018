import { 
  Puzzle,
  Seven as Current,
 } from './puzzles'

function runPuzzle<T, U>(puzzle: Puzzle<T, U>) {
  const partOne = puzzle.calculatePartOne()
  console.log(`Part One: ${partOne}`)
  const partTwo = puzzle.calculatePartTwo()
  console.log(`Part Two: ${partTwo}`)
}

runPuzzle(new Current())