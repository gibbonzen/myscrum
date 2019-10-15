import { ScrumElement } from "../model/ScrumElement";
import { FileConsumer, FileConsumerEvent } from "../../watcher/FileConsumer";
import { FileWatcher } from "../../watcher/FileWatcher";
import { EventEmitter } from "events";
import { ScrumElementEvent } from "./ScrumElementEvent.enum";

export class BacklogManager {
  private emitter = new EventEmitter()
  private scrumElements: ScrumElement[] = []

  constructor() { 
    let backlogConsumer = new FileConsumer()
    this.subscribe(backlogConsumer)

    let watcher = new FileWatcher('C:/Users/L0510125/home/explore/donOt/backlog', 0)
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
    provider.on(FileConsumerEvent.ADD, (el: ScrumElement) => this.addElement(el))
    provider.on(FileConsumerEvent.UPDATE, (el: ScrumElement) => this.updateElement(el))
    provider.on(FileConsumerEvent.REMOVE, (el: ScrumElement) => this.removeElement(el))
  }

  public on(event: ScrumElementEvent, next: (...els: ScrumElement[]) => void) {
    this.emitter.addListener(event, next)
  }

  private addElement(el: ScrumElement) {
    console.log(`Scrum element added: ${el.name}`)
    this.scrumElements.push(el)
    this.emit(ScrumElementEvent.ADD, el)
  }
  
  private updateElement(el: ScrumElement) {
    console.log(`Scrum element updated: ${el.name}`)
  }
  
  private removeElement(el: ScrumElement) {
    console.log(`Scrum element removed: ${el.name}`)
  }

  private emit(event: ScrumElementEvent, el: ScrumElement) {
    console.log("Event:", event)
    this.emitter.emit(event, el)
  }

}