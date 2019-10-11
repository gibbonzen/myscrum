import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const configFile = 'assets/app.config.json';

export interface AppConfig {
  host: {
    name: string,
    port: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig

  constructor(private http: HttpClient) {
    // this.http.get(configFile).subscribe((appConfig: AppConfig) => this.config = appConfig)
  }

  public getServerUrl() {
    return `http://localhost:8080`
  }
}
