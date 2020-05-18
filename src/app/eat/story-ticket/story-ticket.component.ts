import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';

@Component({
  selector: 'eat-story-ticket',
  templateUrl: './story-ticket.component.html',
  styleUrls: ['./story-ticket.component.scss']
})
export class StoryTicketComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit(): void {
  }

  getLastUpdate() {
    return this.story.history[this.story.history.length-1];
  }

}
