export class StringComparer {
  findWordsThatDifferByOneLetter(words:string[]):string {
    for (let i = 0; i < words.length; i++) {
      const first = words[i]
      for (let j = i + 1; j < words.length; j++) {
        const second = words[j]

        const common = getLettersInCommon(first, second)

        if (common.length === second.length - 1) {
          return common
        }
      }
    }

    return ''
  }
}

function getLettersInCommon(first:string, second:string):string {
  const result = []
  for (let i = 0; i < first.length; i++) {
    const letterOfFirst = first[i]
    const letterOfSecond = second[i]

    if (letterOfFirst === letterOfSecond) {
      result.push(letterOfFirst)
    }
  }

  return result.join('')
}