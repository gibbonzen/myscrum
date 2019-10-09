import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ChatMessage } from 'src/app/model/ChatMessage.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private messages: ChatMessage[] = []

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.subscribe(msg => this.onMessage(msg))
  }

  private sendMessage(text: string) {
    this.chat.sendMessage(text)
  }

  private onMessage(message: ChatMessage) {
    this.messages.push(message)
  }

  private onKeydown(event) {
    // if(event.key === 'Enter') {
      this.sendMessage(event.target.value)
      event.target.value = ""
    // }
  }

}
