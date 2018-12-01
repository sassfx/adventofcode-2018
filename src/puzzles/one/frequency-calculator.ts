export class FrequencyCalculator {
  calculateFrequency(frequencyString:string, separator:string):number {
    let frequency = 0
    const generator = frequencyValueGenerator(frequencyString, separator, false)
    
    for(let value of generator) {
      frequency += value
    }

    return frequency
  }

  calculateFirstFrequencyReachedTwice(frequencyString: string, separator: string):number {
    let frequency = 0
    const frequencies:number[] = [0] 
    const generator = frequencyValueGenerator(frequencyString, separator, true)
    
    for(let value of generator) {
      frequency += value
      if (frequencies.indexOf(frequency) > -1) {
        return frequency
      }
      frequencies.push(frequency)
    }
  }
}

function *frequencyValueGenerator(frequencyString:string, separator:string, keepLooping: boolean):IterableIterator<number> {
  const frequencyValues = frequencyString.split(separator).map(part => parseInt(part.trim()))

  do {
    for(let value of frequencyValues) {
      yield value
    }
  } while (keepLooping)
}