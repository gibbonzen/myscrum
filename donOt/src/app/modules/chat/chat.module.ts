import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module'; // Import MaterialModule to access material components

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ChatRoutingModule
  ],
  exports: [ChatComponent],
  providers: []
})
export class ChatModule { }
