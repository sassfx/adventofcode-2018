import * as fs from 'fs';
import * as path from 'path'

class FileReader {
    public static ReadFile(day:number, fileName:string):string {
        return fs.readFileSync(path.resolve('.', 'src', 'puzzles', `day-${toNumericString(day)}`, `${fileName}.txt`)).toString('utf8');
    }
}

const toNumericString = (input:number) => input.toLocaleString('en-US', { minimumIntegerDigits: 2})

export { FileReader };