import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { SocketService } from '../socket/socket.service';
import { SocketEvents } from 'src/app/models/socket/SocketEvents.model';
import { ChatMessage } from 'src/app/models/socket/ChatMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private user: string = "Me"
  private emitter = new EventEmitter()

  private messages: ChatMessage[] = [
    new ChatMessage("Server", "Test static du server"),
    new ChatMessage("Averel", "Test static d'un client")
  ]

  constructor(private socket: SocketService) {
    this.socket.onEvent(SocketEvents.MESSAGE, (obj: ChatMessage) => this.onMessage(obj))
  }

  public sendMessage(text: string) {
    this.onMessage(new ChatMessage(this.user, text))
  }

  private onMessage(message: ChatMessage) {
    this.messages.push(message)
    this.emit(message)

    if(this.messages.length > 5) {
      this.messages.shift()
    }
  }

  public emit(message: ChatMessage) {
    this.emitter.emit(SocketEvents.MESSAGE, message)
    this.socket.send(SocketEvents.MESSAGE, message)
  }

  public subscribe(onMessage) {
    this.emitter.addListener(SocketEvents.MESSAGE, onMessage)

    if(this.messages.length > 0) {
      this.messages.forEach(m => this.emitter.emit(SocketEvents.MESSAGE, m))
    }
  }

}
