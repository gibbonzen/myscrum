import { ScrumElement } from "../model/ScrumElement";
import { FileConsumer, FileConsumerEvent, DataFile, FileMetaData } from "../../watcher/FileConsumer";
import { FileWatcher } from "../../watcher/FileWatcher";
import { EventEmitter } from "events";
import { ScrumElementEvent } from "./ScrumElementEvent.enum";
import { FileUtils } from "../../utils/FileUtils";
import { LOG, Color } from "../../utils/LOG";
import { AppConfig } from "../../utils/Config";
import { Manager } from "./Manager";

export class BacklogManager extends Manager {

  constructor() { 
    super()
    let backlogConsumer = new FileConsumer()
    this.subscribe(backlogConsumer)

    let watcher = new FileWatcher(AppConfig.getRepo('backlog'), 0)
    watcher.subscribe(backlogConsumer)
    watcher.start()
  }

  private subscribe(provider: FileConsumer) {
    /////////////////////////////
    // Event from file watcher //
    /////////////////////////////

    // On new file :
    // 0. Check if ScrumElement's ID exists
    // 1. Store the ScrumElement's ID and origin file path
    // 2. Store the ScrumElement
    // 3. Notify observers
    provider.on(FileConsumerEvent.ADD, (dataFile: DataFile<ScrumElement>) => {
      this.dataFiles.set(dataFile.data.id, dataFile.file.path)
      if(!this.exists(dataFile.data.id)) {
        this.addElement(dataFile.data)
      }
    })

    // On update file :
    // 1. Check if file data are not the same as stored data 
    // 2. If not : update stored data and notify observers
    provider.on(FileConsumerEvent.UPDATE, (dataFile: DataFile<ScrumElement>) => this.updateElement(dataFile.data))

    // On delete :
    // 1. Delete stored data
    // 2. Notify observers
    provider.on(FileConsumerEvent.REMOVE, (dataFile: DataFile<ScrumElement>) => this.fileRemoved(dataFile.file.path))
  }
}