import { SocketService } from "./lib/socket/SocketService"
import { BacklogManager } from "./lib/scrum/controller/BacklogManager"
import { ScrumElement } from "./lib/scrum/model/ScrumElement"
import { SocketObject, SocketObjectFactory } from "./lib/socket/SocketMessage.model"
import { SocketEvent } from "./lib/socket/SocketEvent.enum"
import { ScrumElementEvent } from "./lib/scrum/controller/ScrumElementEvent.enum"

const express = require('express')
const app = express()
const server = require('http').Server(app) 
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const { FileUtils } = require('./lib/utils/FileUtils')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const appConfig = FileUtils.read(path.join(__dirname, '../', 'app.config.json'))
server.listen(appConfig.server.port, 'localhost', () => console.log(`Started on ${appConfig.server.port}`))

// Socket communication
const ioService = SocketService.getInstance(server)
ioService.listen()

ioService.broadcastTest()

// Watcher
let backlogManager = new BacklogManager()
backlogManager.on(ScrumElementEvent.ADD, (el: ScrumElement) => 
  ioService.broadcast(SocketEvent.SCRUM_ELEMENT_ADDED, SocketObjectFactory.create<ScrumElement>(el)))

ioService.on(SocketEvent.CONNECT, () => {
  ioService.broadcast(SocketEvent.SCRUM_ELEMENT_ADDED, SocketObjectFactory.create<ScrumElement[]>(backlogManager.getAll()))
})
  
ioService.on(SocketEvent.SCRUM_ELEMENT_CHANGED, (el: SocketObject<ScrumElement>) => backlogManager.updateElement(el.object))
