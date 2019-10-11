import { SocketService } from "./lib/socket/SocketService"

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