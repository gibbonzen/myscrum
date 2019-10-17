import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatModule } from './modules/chat/chat.module';
import { BacklogModule } from './modules/backlog/backlog.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { ScrumManager } from './services/scrum/scrum.manager.service';

const socketRoutes: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    // Components
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,

    SocketIoModule.forRoot(socketRoutes),

    // Modules
    ChatModule,

    BacklogModule,

    SprintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private scrumManager: ScrumManager) {}
}
