import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';
import { Job, getIcon } from '../model/job.model';
import { History } from '../model/history.model';

@Component({
  selector: 'eat-story-ticket',
  templateUrl: './story-ticket.component.html',
  styleUrls: ['./story-ticket.component.scss']
})
export class StoryTicketComponent implements OnInit {
  @Input() story: Story;
  lastHistory: History;

  constructor() { }

  ngOnInit(): void {
    this.lastHistory = this.getLastUpdate();
  }

  getLastUpdate(): History {
    return this.story.history[this.story.history.length-1];
  }

  getIcon() {
    return getIcon(this.lastHistory.job);
  }

}
