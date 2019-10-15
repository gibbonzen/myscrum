import { ChatMessage } from "./ChatMessage.model"
import { SocketEvents } from "./SocketEvents.enum"
import { Tools } from "../utils/Tools"
import { EventEmitter } from "events"
import { SocketObject } from "./SocketMessage.model"
import { LOG, Color } from "../utils/LOG"

const socket_io = require('socket.io')

export class SocketManager {
  private io
  private sockets: any[] = []

  constructor(io) {
    this.io = io
  }

  public add(socket) {
    this.sockets.push(socket)
  }
  
  public get(socket) {
    return this.sockets.find(s => s === socket)
  }

  public remove(socket) {
    this.sockets.splice(this.sockets.indexOf(this.get(socket)), 1)
  }

  public broadcast(event, obj) {
    LOG.log(Color.FG_RED, `Emit: ${event}`)
    this.io.emit(event, obj)
  }

}

export class SocketService {
  
  public io
  public static INSTANCE: SocketService
  public manager: SocketManager

  private emitter = new EventEmitter()

  private constructor(Server) {
    this.io = socket_io(Server)
    this.manager = new SocketManager(this.io)
  }
  
  public static getInstance(Server) {
    if(this.INSTANCE === undefined)
    this.INSTANCE = new SocketService(Server)
    
    return this.INSTANCE
  }
  
  public listen() {
    this.io.on('connection', socket => {
      console.log("Socket connected...")
      this.emitter.emit('connect')
      
      socket.emit(SocketEvents.MESSAGE, new ChatMessage('Server', 'Connection established'))
      socket.on('disconnect', socket => this.onDisconnect(socket))
      
      this.manager.add(socket)
    })
  }
  
  private onDisconnect(socket) {
    console.log("Socket disconnected...")
    this.manager.remove(socket)
  }

  public onConnect(next) {
    this.emitter.on('connect', next)
  }

  public broadcast<T>(event: SocketEvents, obj: SocketObject<T>) {
    this.manager.broadcast(event, obj)
  }
  
  public broadcastTest() {
    this.manager.broadcast(SocketEvents.MESSAGE, new ChatMessage('Server', Tools.generateID()))
    setTimeout(() => this.broadcastTest(), 2500)
  }

}