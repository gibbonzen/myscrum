const fs = require('fs')
const path = require('path')

export class FileUtils {

  static read(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath))
  }

  static write<T>(filepath: string, obj: T) {
    let arr = null
    let json = JSON.stringify(obj, arr, '  ')
    fs.writeFileSync(filepath, json)
  }

  static remove(filepath: string) {
    fs.unlinkSync(filepath)
  }
}