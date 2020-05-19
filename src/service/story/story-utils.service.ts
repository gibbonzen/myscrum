import { Story } from '../../app/eat/model/story.model';
import { Status } from '../../app/eat/model/status.model';
import { History } from '../../app/eat/model/history.model';
import { StoryWorkflowService } from './story-workflow.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoryUtils {

  constructor(private workflowService: StoryWorkflowService) {}

  updateStatus(story: Story, status: Status) {
    const last = this.getLastHistory(story.history);

      story.history.push({
        date: Date.now(),
        job: last.job,
        status: status,
      });
  }

  sortHistory(history: History[]): History[] {
    return history.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
  }

  getLastHistory(history: History[]): History {
    if (!Array.isArray(history)) {
      return history;
    }
    
    const sorted = this.sortHistory(history);
    return sorted.reverse()[0];
  }

  filterByStatus(history: History, status: Status): boolean {
    return history.status === status;
  }

  filterLastHistory(stories: Story[], status: Status): Story[] {
    return stories
      .filter(story => this.getLastHistory(story.history).status === status); // last history    
  }

  
}
