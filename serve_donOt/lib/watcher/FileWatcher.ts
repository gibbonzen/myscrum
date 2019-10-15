import { EventEmitter } from "events"
import { FileConsumer, File } from "./FileConsumer"

const Path = require('path')
const chokidar = require('chokidar')

export enum FileWatcherEvent {
  START = "start",
  STOP = "stop",
  ADD = "get",
  REMOVE = "remove",
  UPDATE = "update"
}

export interface FileWatcherListener {
  onFileAdded: (file: File) => void
  onFileChanged: (file: File) => void
  onFileUnlink: (file: File) => void
}

export class FileWatcher {
  private watcher
  private emitter: EventEmitter = new EventEmitter()

  private watching: boolean = false

  constructor(filepath: string, recursive: number) {
    this.watcher = chokidar.watch(filepath, { depth: recursive })
  }
  
  private watch() {
    this.watcher
      .on('add', (path, stats) => this.onFileAdded(path, stats))
      .on('change', (path, stats) => this.onFileChange(path, stats))
      .on('unlink', (path, stats) => this.onFileUnlink(path, stats))
  }

  public subscribe(consumer: FileConsumer) {
    this.emitter.addListener(FileWatcherEvent.ADD, (file: File) => consumer.onFileAdded(file))
    this.emitter.addListener(FileWatcherEvent.UPDATE, (file: File) => consumer.onFileChanged(file))
    this.emitter.addListener(FileWatcherEvent.REMOVE, (file: File) => consumer.onFileUnlink(file))
  }
  
  public isWatching() {
    return this.watching
  }
  
  public setWatching(watch: boolean) {
    this.watching = watch
  }
  
  public start() {
    this.setWatching(true)
    this.emitter.emit(FileWatcherEvent.START)
    this.watch()
  }

  public stop() {
    this.setWatching(false)
    this.emitter.emit(FileWatcherEvent.STOP)
  }

  public close() {
    this.stop()
    this.watcher.close()
  }

  /**
   * Read file on added
   */
  private onFileAdded(path, stats) {
    console.log(`File added: ${Path.basename(path)}`)
    this.emitter.emit(FileWatcherEvent.ADD, {path: path, stats: stats})
  }
  
  private onFileChange(path, stats) {
    console.log(`File changed: ${Path.basename(path)}`)
    this.emitter.emit(FileWatcherEvent.UPDATE, {path: path, stats: stats})
  }
  
  private onFileUnlink(path, stats) {
    console.log(`File deleted: ${Path.basename(path)}`)
    this.emitter.emit(FileWatcherEvent.REMOVE, {path: path, stats: stats})
  }
  
}