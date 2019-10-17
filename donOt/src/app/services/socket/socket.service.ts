import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketObject } from 'src/app/models/socket/SocketObject.model';
import { SocketEvent } from 'src/app/models/socket/SocketEvent.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  public send<T>(event: SocketEvent, obj: SocketObject<T>) {
    this.socket.emit(event, obj)
  }

  public onEvent<T>(event: SocketEvent, next: (obj: SocketObject<T>) => void) {
    this.socket.on(event, next)
  }

}
