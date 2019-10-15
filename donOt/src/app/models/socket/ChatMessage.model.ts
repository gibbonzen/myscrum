import { SocketObject } from './SocketObject.model'

export class ChatMessage implements SocketObject<string> {
  time: number
  name: string
  object: string

  constructor(name: string, message: string) {
    this.name = name
    this.time = Date.now()
    this.object = message
  }
}
