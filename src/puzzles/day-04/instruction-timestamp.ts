const timeStampRegex = /(?<yearString>\d{4})-(?<monthString>\d{2})-(?<dayString>\d{2})\s(?<hourString>\d{2}):(?<minuteString>\d{2})/g

export class InstructionTimeStamp {
  readonly year:number
  readonly month: number
  readonly day:number
  readonly hour:number
  readonly minute:number

  constructor(timeString) {
    const match = timeStampRegex.exec(timeString)
    const { yearString, monthString, dayString, hourString, minuteString } = match.groups

    this.year = parseInt(yearString)
    this.month = parseInt(monthString)
    this.day = parseInt(dayString)
    this.hour = parseInt(hourString)
    this.minute = parseInt(minuteString)

    timeStampRegex.lastIndex = 0
  }
  
  compare(other:InstructionTimeStamp):number {
    if (this.year === other.year) {
      if (this.month === other.month) {
        if (this.day === other.day) {
          if (this.hour === other.hour) {
            return this.minute - other.minute
          }
          return this.hour - other.hour
        }
        return this.day - other.day
      }
      return this.month - other.month
    }
    return this.year - other.year
  }
}