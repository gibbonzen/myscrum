import { ScrumElement, ScrumElementEvent } from '../../models/scrum/ScrumElement';
import { Injectable } from '@angular/core';
import { ScrumElementService } from '../scrum-element/scrum-element.service';
import { SocketEvent } from '../../models/socket/SocketEvent.model';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class BacklogManager {
  private emitter = new EventEmitter()
  private elements: ScrumElement[] = []

  constructor(private scrumService: ScrumElementService) {
    // Event from socket
    this.scrumService.on<ScrumElement[]>(SocketEvent.SCRUM_ELEMENT_GET, els => this.addElements(els))
    this.scrumService.on<ScrumElement>(SocketEvent.SCRUM_ELEMENT_ADD, el => this.addElement(el))
    this.scrumService.on<ScrumElement>(SocketEvent.SCRUM_ELEMENT_PUT, el => this.putElement(el))
    this.scrumService.on<ScrumElement>(SocketEvent.SCRUM_ELEMENT_DEL, el => this.removeElement(el))

    // Event to socket
    this.emitter.addListener(ScrumElementEvent.CHANGE, el => this.scrumService.emit(SocketEvent.SCRUM_ELEMENT_PUT, el))
    this.emitter.addListener(ScrumElementEvent.DELETE, el => this.scrumService.emit(SocketEvent.SCRUM_ELEMENT_DEL, el))
  }

  public addElement(el: ScrumElement) {
    if(this.getByID(el.id) !== undefined) return

    let onChange = {
      set: (obj, prop, val) => {
        obj[prop] = val
        this.emit(ScrumElementEvent.CHANGE, obj)
        return true
      }
    }

    this.elements.push(new Proxy(el, onChange))
  }

  public addElements(els: ScrumElement[]) {
    els.forEach(el => this.addElement(el))
  }

  public putElement(el: ScrumElement) {
    let current = this.getByID(el.id)
    for(let key in el) {
      if(JSON.stringify(current[key]) != JSON.stringify(el[key])) { // stringify to compare strings in place of object or array
        current[key] = el[key]
      }
    }
  }

  public getElements() {
    return this.elements
  }

  public removeElement(el: ScrumElement) {
    console.log("remove ", el)

    this.elements.splice(this.indexOf(el), 1)
    this.emit(ScrumElementEvent.DELETE, el)
  }

  public getByID(id: string) {
    return this.elements.find(e => e.id == id)
  }

  private indexOf(el: ScrumElement) {
    return this.elements.indexOf(el)
  }

  private emit(evt: ScrumElementEvent, el: ScrumElement) {
    this.emitter.emit(evt, el)
  }

}
