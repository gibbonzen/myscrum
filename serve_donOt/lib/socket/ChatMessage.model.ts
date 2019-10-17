import { SocketObject } from "./SocketMessage.model"

export class ChatMessage implements SocketObject<string> {
  name: string
  transmitter: ''
  time: number
  object: string
  
  constructor(name: string, message: string) {
    this.name = name
    this.time = Date.now()
    this.object = message
  }
}
