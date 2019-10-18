import { FileUtils } from "../utils/FileUtils";
import { EventEmitter } from "events";
import { FileWatcherListener } from "./FileWatcher";

export enum FileConsumerEvent {
  ADD = "added",
  UPDATE = "update",
  REMOVE = "remove"
}

export interface FileMetaData {
  path: string,
  stats: any
}

export interface DataFile<T> {
  file: FileMetaData,
  data: T
}

export class FileConsumer implements FileWatcherListener {
  private emitter = new EventEmitter()

  constructor() { }

  public on<T>(event: FileConsumerEvent, next: (dataFile: DataFile<T>) => void) {
    this.emitter.addListener(event, next)
  }

  private onEvent(event: FileConsumerEvent, file: FileMetaData) {
    let json = FileUtils.read(file.path)
    this.emitter.emit(event, {file: file, data: json})
  }

  public onFileAdded(file: FileMetaData) {
    this.onEvent(FileConsumerEvent.ADD, file)
  }
  
  public onFileChanged(file: FileMetaData) {
    this.onEvent(FileConsumerEvent.UPDATE, file)
  }
  
  public onFileUnlink(file: FileMetaData) {
    this.emitter.emit(FileConsumerEvent.REMOVE, {file: file, data: null})
  }

}