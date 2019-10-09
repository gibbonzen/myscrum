import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatMessage } from 'src/app/model/ChatMessage.model';

const MESSAGE_EVENT: string = 'message';

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

  constructor() { }

  public sendMessage(text: string) {
    this.onMessage(new ChatMessage(this.user, text))
  }

  private onMessage(message: ChatMessage) {
    this.messages.push(message)
    this.emitter.emit(MESSAGE_EVENT, message)
  }

  public subscribe(onMessage) {
    this.emitter.addListener(MESSAGE_EVENT, onMessage)

    if(this.messages.length > 0) {
      this.messages.forEach(m => this.emitter.emit(MESSAGE_EVENT, m))
    }
  }

}
