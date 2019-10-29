import { SocketService } from "./lib/socket/SocketService"
import { BacklogManager } from "./lib/scrum/controller/BacklogManager"
import { SprintsManager } from "./lib/scrum/controller/SprintsManager"
import { ScrumElement } from "./lib/scrum/model/ScrumElement"
import { SocketObject, SocketObjectFactory } from "./lib/socket/SocketMessage.model"
import { SocketEvent } from "./lib/socket/SocketEvent.enum"
import { ScrumElementEvent } from "./lib/scrum/controller/ScrumElementEvent.enum"
import { AppConfig } from "./lib/utils/Config"

const express = require('express')
const app = express()
const server = require('http').Server(app) 
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

server.listen(AppConfig.getServerPort(), 'localhost', () => console.log(`Started on ${AppConfig.getServerPort()}`))

// Socket communication
const ioService = SocketService.getInstance(server)
ioService.listen()

ioService.broadcastTest()

// Backlog event
let backlogManager = new BacklogManager()
backlogManager.on(ScrumElementEvent.ADD, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_ADD, SocketObjectFactory.create<ScrumElement>(el)))
backlogManager.on(ScrumElementEvent.UPDATE, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_PUT, SocketObjectFactory.create<ScrumElement>(el)))
backlogManager.on(ScrumElementEvent.REMOVE, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_DEL, SocketObjectFactory.create<ScrumElement>(el)))

//Sprint event
let sprintManager = new SprintsManager()
sprintManager.on(ScrumElementEvent.ADD, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_ADD, SocketObjectFactory.create<ScrumElement>(el)))
sprintManager.on(ScrumElementEvent.UPDATE, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_PUT, SocketObjectFactory.create<ScrumElement>(el)))
sprintManager.on(ScrumElementEvent.REMOVE, (el: ScrumElement) => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_DEL, SocketObjectFactory.create<ScrumElement>(el)))


// Socket event
ioService.on(SocketEvent.CONNECT, () => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_GET, SocketObjectFactory.create<ScrumElement[]>(backlogManager.getAll())))
ioService.on(SocketEvent.CONNECT, () => ioService.broadcast(SocketEvent.SCRUM_ELEMENT_GET, SocketObjectFactory.create<ScrumElement[]>(sprintManager.getAll())))
ioService.on(SocketEvent.SCRUM_ELEMENT_PUT, (el: SocketObject<ScrumElement>) => backlogManager.updateElement(el.object))
