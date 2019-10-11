import { SocketMessage } from "./SocketMessage.model"
import { ChatMessage } from "./ChatMessage.model"
import { SocketEvents } from "./SocketEvents.enum"
import { Tools } from "../utils/Tools"

const socket_io = require('socket.io')

export class SocketManager {
  private sockets: any[] = []

  constructor() {}

  public add(socket) {
    this.sockets.push(socket)
    this.onEvent(socket, console.log)
  }
  
  public get(socket) {
    return this.sockets.find(s => s === socket)
  }

  public remove(socket) {
    this.sockets.splice(this.sockets.indexOf(this.get(socket)), 1)
  }

  private onEvent(socket, onEvent) {
    socket.on(SocketEvents.MESSAGE, onEvent)
  }

  public broadcast(msg: SocketMessage) {
    this.sockets.forEach(s => {
      s.emit(SocketEvents.MESSAGE, msg)
    })
  }
}

export class SocketService {
  
  public io
  public static INSTANCE: SocketService
  public manager: SocketManager = new SocketManager()
  
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
      this.manager.add(socket)
      
      socket.emit(SocketEvents.MESSAGE, new ChatMessage('Server', 'Connection established'))
      socket.on('disconnect', socket => this.onDisconnect(socket))
    })
  }

  private onDisconnect(socket) {
    console.log("Disconnected", socket)
    this.manager.remove(socket)
  }
  
  public broadcastTest() {
    this.manager.broadcast(new ChatMessage('Server', Tools.generateID()))
    setTimeout(() => this.broadcastTest(), 2500)
  }
}