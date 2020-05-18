import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';
import { DbService } from 'src/firebase/db.service';
import { Subscription } from 'rxjs';
import { History } from '../model/history.model';


@Component({
  selector: 'eat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() stories: Story[];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
  }

  sortHistory(history: History[]): History[] {
    return history.sort((a, b) => {
      if(a.date < b.date) return -1;
      if(a.date > b.date) return 1;
      return 0;
    });
  }

  getLastHistory(history: History[]): History {
    return this.sortHistory(history).reverse()[0];
  }

  getTodo() {
    return this.stories.filter(s => this.getLastHistory(s.history).status === "todo");
  }
  
  getInProgress() {
    return this.stories.filter(s => this.getLastHistory(s.history).status === "progress");
  }
  
  getDone() {
    return this.stories.filter(s => this.getLastHistory(s.history).status === "done");
  }

  createStory() {
    let story = new Story('test1', 'description 1', { name: 'dev', icon: "settings_ethernet" });
    this.dbService.createStory(story);
  }

}
