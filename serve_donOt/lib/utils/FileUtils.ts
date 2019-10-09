const fs = require('fs')
const path = require('path')

export class FileUtils {

  static read(file: string) {
    return JSON.parse(fs.readFileSync(file))
  }
}