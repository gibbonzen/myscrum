import { ScrumElement } from "../model/ScrumElement";
import { FileConsumer, FileConsumerEvent, DataFile, FileMetaData } from "../../watcher/FileConsumer";
import { FileWatcher } from "../../watcher/FileWatcher";
import { EventEmitter } from "events";
import { ScrumElementEvent } from "./ScrumElementEvent.enum";
import { FileUtils } from "../../utils/FileUtils";
import { LOG, Color } from "../../utils/LOG";
import { AppConfig } from "../../utils/Config";

export class BacklogManager {
  private emitter = new EventEmitter()
  private scrumElements: ScrumElement[] = []
  private dataFiles: Map<string, string> = new Map()

  constructor() { 
    let backlogConsumer = new FileConsumer()
    this.subscribe(backlogConsumer)

    let watcher = new FileWatcher(AppConfig.getLocalRepo('backlog'), 0)
    watcher.subscribe(backlogConsumer)
    watcher.start()
  }

  public get(el: number) {
    return this.scrumElements[el]
  }

  public getAll() {
    return this.scrumElements
  }

  private subscribe(provider: FileConsumer) {
    provider.on(FileConsumerEvent.ADD, (dataFile: DataFile<ScrumElement>) => {
      this.dataFiles.set(dataFile.data.id, dataFile.file.path)
      this.addElement(dataFile.data)
    })
    provider.on(FileConsumerEvent.UPDATE, (dataFile: DataFile<ScrumElement>) => this.updateElement(dataFile.data, false))
    provider.on(FileConsumerEvent.REMOVE, (dataFile: DataFile<ScrumElement>) => this.removeElement(dataFile.data))
  }

  public on(event: ScrumElementEvent, next: (...els: ScrumElement[]) => void) {
    this.emitter.addListener(event, next)
  }

  public addElement(el: ScrumElement) {
    LOG.log(Color.FG_GREEN, `Scrum element added: ${el.name}`)
    this.scrumElements.push(el)
    this.emit(ScrumElementEvent.ADD, el)
  }
  
  public updateElement(el: ScrumElement, consume: boolean) {
    LOG.log(Color.FG_GREEN, `Scrum element updated: ${el.name}`)
    let current = this.scrumElements.find(sel => sel.id === el.id)
    
    for(let key of Object.keys(current)) {
      current[key] = el[key]
    }
    this.updateFile(el)
    if(consume) return;

    this.emit(ScrumElementEvent.UPDATE, current)
  }
  
  public removeElement(el: ScrumElement) {
    LOG.log(Color.FG_GREEN, `Scrum element removed: ${el.name}`)
    this.scrumElements.splice(this.indexOf(el))
    
    this.emit(ScrumElementEvent.REMOVE, el)
  }

  public indexOf(el: ScrumElement) {
    return this.scrumElements.indexOf(el)
  }

  private emit(event: ScrumElementEvent, el: ScrumElement) {
    this.emitter.emit(event, el)
  }

  private updateFile(el: ScrumElement) {
    if(this.dataFiles.has(el.id)) {
      let pathfile = this.dataFiles.get(el.id)
      FileUtils.write<ScrumElement>(pathfile, el)
    }
  }
  
  private removeFile(scrumElementID: string) {
    if(this.dataFiles.has(scrumElementID)) {
      FileUtils.remove(this.dataFiles.get(scrumElementID))
      this.dataFiles.delete(scrumElementID)
    }
  }

}