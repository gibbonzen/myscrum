import { ChatMessage } from "./ChatMessage.model"
import { SocketEvent } from "./SocketEvent.enum"
import { Tools } from "../utils/Tools"
import { EventEmitter } from "events"
import { SocketObject } from "./SocketMessage.model"
import { LOG, Color } from "../utils/LOG"

const socket_io = require('socket.io')

export class SocketService {
  
  public io
  public static INSTANCE: SocketService

  private sockets = []
  private emitter = new EventEmitter()

  private constructor(Server) {
    this.io = socket_io(Server)
  }
  
  public static getInstance(Server) {
    if(this.INSTANCE === undefined)
    this.INSTANCE = new SocketService(Server)
    
    return this.INSTANCE
  }
  
  public listen() {
    this.io.on('connection', socket => {
      console.log("Socket connected...")
      this.sockets.push(socket)
      this.emitter.emit(SocketEvent.CONNECT, null)
      
      socket.emit(SocketEvent.MESSAGE, new ChatMessage('Server', 'Connection established'))
      this.on<string>(SocketEvent.MESSAGE, (obj: ChatMessage) => {
        if(obj.name == 'Server') return
        LOG.log(Color.FG_GREEN, 'Receive: message')
      })

      socket.on('disconnect', socket => this.onDisconnect(socket))

      this.initSocketObservers(socket)
    })
  }
  
  private initSocketObservers(socket) {
    socket.on(SocketEvent.SCRUM_ELEMENT_ADDED, obj => this.emit(SocketEvent.SCRUM_ELEMENT_ADDED, obj))
    socket.on(SocketEvent.SCRUM_ELEMENT_CHANGED, obj => this.emit(SocketEvent.SCRUM_ELEMENT_CHANGED, obj))
    socket.on(SocketEvent.SCRUM_ELEMENT_DELETED, obj => this.emit(SocketEvent.SCRUM_ELEMENT_DELETED, obj))
  }

  private onDisconnect(socket) {
    console.log("Socket disconnected...")
    this.sockets.splice(this.sockets.indexOf(socket), 1)
  }

  public on<T>(event: SocketEvent, next: (obj: SocketObject<T>) => void) {
    this.emitter.on(event, next)
  }

  public emit(event: SocketEvent, next: (obj) => void) {
    this.emitter.emit(event, next)
  }

  public broadcast<T>(event: SocketEvent, obj: SocketObject<T>) {
    // LOG.log(Color.FG_RED, `Emit: ${event}`)
    this.io.emit(event, obj)
  }
  
  
  public broadcastTest() {
    this.broadcast(SocketEvent.MESSAGE, new ChatMessage('Server', Tools.generateID()))
    setTimeout(() => this.broadcastTest(), 2500)
  }

}