export interface IChatMessage {
  name: string,
  message: string
}

export class ChatMessage {
  name: string
  message: string

  constructor(name: string, message: string) {
    this.name = name
    this.message = message
  }
}
