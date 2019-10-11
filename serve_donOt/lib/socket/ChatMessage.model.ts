import { SocketMessage } from "./SocketMessage.model"

export class ChatMessage implements SocketMessage {
  name: string
  time: number
  message: string

  constructor(name: string, message: string) {
    this.name = name
    this.time = Date.now()
    this.message = message
  }
}
