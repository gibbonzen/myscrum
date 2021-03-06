const path = require('path')
import { FileUtils } from "./FileUtils"

export interface Config {
  server: {
    port: number
  },
  git: {
    usedir: string,
    local: string,
    origin: string
  }
}

export class AppConfig {
  private static config: Config
  private static INSTANCE: AppConfig
  
  private constructor() {
    AppConfig.config = FileUtils.read(path.resolve(path.join('./', 'app.config.json')))
  }
  
  private static init() {
    if(AppConfig.INSTANCE == undefined) AppConfig.INSTANCE = new AppConfig()
  }

  public static getServerPort() {
    this.init()
    return AppConfig.config.server.port
  }
  
  public static getRepo(dir: string) {
    this.init()
    return path.join(AppConfig.config.git[AppConfig.config.git.usedir], dir)
  }
  
}