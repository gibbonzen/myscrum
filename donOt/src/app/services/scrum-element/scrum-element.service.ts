import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { SocketEvents } from 'src/app/models/socket/SocketEvents.model';
import { SocketObject } from 'src/app/models/socket/SocketObject.model';
import { ScrumElement } from 'src/app/models/scrum/ScrumElement';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class ScrumElementService {
  private emitter = new EventEmitter()

  constructor(private socket: SocketService) {
    this.socket.onEvent(SocketEvents.SCRUM_ELEMENT_ADDED, (socketObj: SocketObject<ScrumElement[]>) =>
      this.onEvent(SocketEvents.SCRUM_ELEMENT_ADDED, socketObj)
    )
  }

  private onEvent(event: SocketEvents, socketObj: SocketObject<ScrumElement[]>) {
    this.emitter.emit(event, socketObj.object)
  }

  public on(event: SocketEvents, next: (els: ScrumElement[]) => void) {
    this.emitter.addListener(event, next)
  }

}
