export class ChecksumCalculator {
  calculateChecksum(parts:string[]):number {
    let numberOfPartsWithTwoRepeatedLetters = 0
    let numberOfPartsWithThreeRepeatedLetters = 0

    let twoRepeatedLettersFound = false
    let threeRepteatedLettersFound = false
    for(let part of parts) {
      twoRepeatedLettersFound = false
      threeRepteatedLettersFound = false
      const map = new Map<string, number>()
      for(let letter of part) {
        const current = map.get(letter) || 0
        const updated = current + 1
        map.set(letter, updated)
      }

      for (let entry of map.entries()) {
        const occurrences = entry[1]
        if (occurrences === 2) {
          twoRepeatedLettersFound = true
        }

        if (occurrences === 3) {
          threeRepteatedLettersFound = true
        }
      }

      if (twoRepeatedLettersFound) {
        numberOfPartsWithTwoRepeatedLetters += 1
      }

      if (threeRepteatedLettersFound) {
        numberOfPartsWithThreeRepeatedLetters += 1
      }
    }

    return numberOfPartsWithTwoRepeatedLetters * numberOfPartsWithThreeRepeatedLetters
  }
}