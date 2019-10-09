import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatModule } from './modules/chat/chat.module';

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

    // Modules
    ChatModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
