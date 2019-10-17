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
    provider.on(FileConsumerEvent.UPDATE, (el: ScrumElement) => this.updateElement(el, false))
    provider.on(FileConsumerEvent.REMOVE, (el: ScrumElement) => this.removeElement(el))
  }

  public on(event: ScrumElementEvent, next: (...els: ScrumElement[]) => void) {
    this.emitter.addListener(event, next)
  }

  public addElement(el: ScrumElement) {
    console.log(`Scrum element added: ${el.name}`)
    this.scrumElements.push(el)
    this.emit(ScrumElementEvent.ADD, el)
  }
  
  public updateElement(el: ScrumElement, consume: boolean) {
    console.log(`Scrum element updated: ${el.name}`, el)
    let current = this.scrumElements.find(sel => sel.id === el.id)
    
    for(let key of Object.keys(current)) {
      current[key] = el[key]
    }
    if(consume) return;

    this.emit(ScrumElementEvent.UPDATE, current)
  }
  
  public removeElement(el: ScrumElement) {
    console.log(`Scrum element removed: ${el.name}`)
    this.scrumElements.splice(this.indexOf(el))
  }

  public indexOf(el: ScrumElement) {
    return this.scrumElements.indexOf(el)
  }

  private emit(event: ScrumElementEvent, el: ScrumElement) {
    this.emitter.emit(event, el)
  }

}