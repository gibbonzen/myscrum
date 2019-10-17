export interface SocketObject<T> {
  transmitter: string,
  time: number,
  object: T
}

export class SocketObjectFactory {
  
  public static create<T>(objects: T) {
    // console.log("Create socket object")
    return {
      transmitter: '',
      time: Date.now(),
      object: objects
    }
  }
}