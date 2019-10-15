import { FileUtils } from "../utils/FileUtils";
import { EventEmitter } from "events";
import { FileWatcherListener } from "./FileWatcher";

export enum FileConsumerEvent {
  ADD = "added",
  UPDATE = "update",
  REMOVE = "remove"
}

export interface File {
  path: string,
  stats: any
}

export class FileConsumer implements FileWatcherListener {
  private emitter = new EventEmitter()

  constructor() { }

  public on(event: FileConsumerEvent, listener) {
    this.emitter.addListener(event, listener)
  }

  private onEvent(event: FileConsumerEvent, file: File) {
    let json = FileUtils.read(file.path)
    this.emitter.emit(event, json)
  }

  public onFileAdded(file: File) {
    this.onEvent(FileConsumerEvent.ADD, file)
  }
  
  public onFileChanged(file: File) {
    this.onEvent(FileConsumerEvent.UPDATE, file)
  }
  
  public onFileUnlink(file: File) {
    this.onEvent(FileConsumerEvent.REMOVE, file)
  }

}