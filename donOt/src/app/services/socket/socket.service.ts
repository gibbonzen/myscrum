import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketObject } from 'src/app/models/socket/SocketObject.model';
import { SocketEvents } from 'src/app/models/socket/SocketEvents.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  public send<T>(event: SocketEvents, obj: SocketObject<T>) {
    this.socket.emit(event, obj)
  }

  public onEvent<T>(event: SocketEvents, next: (obj: SocketObject<T>) => void) {
    this.socket.on(event, next)
  }

}
