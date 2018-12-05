import { 
  Puzzle,
  Two,
 } from './puzzles'

function runPuzzle(puzzle: Puzzle) {
  const partOne = puzzle.calculatePartOne()
  console.log(`Part One: ${partOne}`)
  const partTwo = puzzle.calculatePartTwo()
  console.log(`Part Two: ${partTwo}`)
}

runPuzzle(new Two())