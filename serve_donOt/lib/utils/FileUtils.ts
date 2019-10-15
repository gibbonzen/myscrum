const fs = require('fs')
const path = require('path')

export class FileUtils {

  static read(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath))
  }

  static write<T>(filepath: string, obj: T) {
    let arr = []
    fs.writeFileSync(filepath, JSON.stringify(obj, arr, '  '))
  }
}