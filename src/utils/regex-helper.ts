export function textToArray<T>(input:string, regex:RegExp, groupFunction:(groups) => T) {
  let match = regex.exec(input)
  let result:T[] = []
  while (match) {
    result.push(groupFunction(match.groups))
  }

  regex.lastIndex = -1
  return result
}