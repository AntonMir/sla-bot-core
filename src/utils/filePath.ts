import path = require('path');

export class FilePathService {
    getFilePath(fileId: string) {
        return path.join(process.cwd(), 'assets', fileId)
    }
}