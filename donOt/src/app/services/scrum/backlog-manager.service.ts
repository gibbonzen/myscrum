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
    this.scrumService.on(SocketEvent.SCRUM_ELEMENT_ADDED, el => this.addElements(el))

    // Event to socket
    this.emitter.addListener(ScrumElementEvent.CHANGE, el => this.scrumService.emit(SocketEvent.SCRUM_ELEMENT_CHANGED, el))
    this.emitter.addListener(ScrumElementEvent.DELETE, el => this.scrumService.emit(SocketEvent.SCRUM_ELEMENT_DELETED, el))
  }

  public addElement(el: ScrumElement) {
    console.log(el)

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

  public getElements() {
    return this.elements
  }

  public removeElement(el: ScrumElement) {
    this.elements.splice(this.indexOf(el), 1)
    this.emit(ScrumElementEvent.DELETE, el)
  }

  private indexOf(el: ScrumElement) {
    return this.elements.indexOf(el)
  }

  private emit(evt: ScrumElementEvent, el: ScrumElement) {
    this.emitter.emit(evt, el)
  }

}
