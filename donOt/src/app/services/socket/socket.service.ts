import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketMessage } from 'src/app/models/SocketMessage.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  public sendMessage(msg: SocketMessage) {
    this.socket.emit("message", msg)
  }

  public onMessage(next: (msg: SocketMessage) => void) {
    this.socket.on('message', next)
  }

}
