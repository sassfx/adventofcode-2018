import * as fs from 'fs';
import * as path from 'path'

class FileReader {
    public static ReadFile(filePath:string):string {
        return fs.readFileSync(path.resolve('.', 'src', filePath)).toString('utf8');
    }
}

export { FileReader };