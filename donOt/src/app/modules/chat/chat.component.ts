import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ChatMessage } from 'src/app/models/ChatMessage.model';
import { ScrollableDirective } from 'src/app/directives/scrollable.directive';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild(ScrollableDirective, { read: false, static: false })
  private scrollContainer: ScrollableDirective

  private showBtn: boolean = true

  private messages: ChatMessage[] = []

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.subscribe(msg => this.onMessage(msg))
  }

  private sendMessage(text: string) {
    if(text === '' || text === 'Enter your message here...') return

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

    private scrollToBottom() {
      this.scrollContainer.scrollToBottom()
    }

    private isAutoScrollEnable() {
      if(this.scrollContainer !== undefined) {
        this.showBtn = this.scrollContainer.isBottom()
      }

      return this.showBtn
  }

}
