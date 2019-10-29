import { ScrumElement } from "../model/ScrumElement"
import { ScrumElementEvent } from "./ScrumElementEvent.enum"
import { EventEmitter } from "events"
import { LOG, Color } from "../../utils/LOG"
import { FileUtils } from "../../utils/FileUtils"



export class Manager {

    protected emitter = new EventEmitter()
    protected scrumElements: ScrumElement[] = []
    protected dataFiles: Map<string, string> = new Map() // id => filepath

    public get(el: number) {
        return this.scrumElements[el]
      }
    
      public getAll() {
        return this.scrumElements
      }
    
      public on(event: ScrumElementEvent, next: (...els: ScrumElement[]) => void) {
        this.emitter.addListener(event, next)
      }
    
      public addElement(el: ScrumElement) {
        LOG.log(Color.FG_GREEN, `Scrum element added: ${el.name}`)
        this.scrumElements.push(el)
        this.emit(ScrumElementEvent.ADD, el)
      }
      
      public updateElement(el: ScrumElement) {
        LOG.log(Color.FG_GREEN, `Scrum element updated: ${el.name}`)
        if(!this.equals(el)) {
          let current = this.getByID(el.id)
          for(let k in el) {
            current[k] = el[k]
          }
    
          this.updateFile(el)
          this.emit(ScrumElementEvent.UPDATE, el)
        }
      }
      
      public removeElement(el: ScrumElement) {
        LOG.log(Color.FG_GREEN, `Scrum element removed: ${el.name}`)
        this.scrumElements.splice(this.indexOf(el))
        
        this.emit(ScrumElementEvent.REMOVE, el)
      }
    
      public indexOf(el: ScrumElement) {
        return this.scrumElements.indexOf(el)
      }
    
      public getByID(id: string) {
        return this.scrumElements.find(e => e.id === id)
      }
    
      private emit(event: ScrumElementEvent, el: ScrumElement) {
        this.emitter.emit(event, el)
      }
    
      protected updateFile(el: ScrumElement) {
        if(this.dataFiles.has(el.id)) {
          let pathfile = this.dataFiles.get(el.id)
          FileUtils.write<ScrumElement>(pathfile, el)
        }
      }
      
      protected removeFile(scrumElementID: string) {
        if(this.dataFiles.has(scrumElementID)) {
          FileUtils.remove(this.dataFiles.get(scrumElementID))
          this.dataFiles.delete(scrumElementID)
        }
      }
    
      protected fileRemoved(filepath: string) {
        let scrumElementID
        for(let [id, path] of this.dataFiles.entries()) {
          if(path === filepath) scrumElementID = id
        }
    
        if(scrumElementID) {
          this.dataFiles.delete(scrumElementID)
          this.removeElement(this.getByID(scrumElementID))
        }
      }
    
      protected exists(id: string) {
    
        return false
      }
    
      protected equals(newElement: ScrumElement): boolean {
        let oldElement = this.getByID(newElement.id)
        if(oldElement === undefined) return false
        if(Object.keys(oldElement).length != Object.keys(newElement).length) return false;
        for(let key in newElement) {
          console.log(key, JSON.stringify(oldElement[key]) == JSON.stringify(newElement[key]))
            if(JSON.stringify(oldElement[key]) != JSON.stringify(newElement[key]))
              return false
        }
    
        return true
      }

}