export interface SocketObject<T> {
  time: number,
  object: T
}

export class SocketObjectFactory {

  public static create<T>(objects: T) {
    console.log("Create socket object")
    return {
      time: Date.now(),
      object: objects
    }
  }
}
