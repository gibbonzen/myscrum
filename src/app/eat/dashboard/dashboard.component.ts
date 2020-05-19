import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';
import { StoryUtils } from 'src/service/story/story-utils.service';
import { Filter } from '../model/filter.model';
import { StoryCreateComponent } from '../story-create/story-create.component';
import { DialogService } from 'src/external_modules/ui/dialog/service/dialog.service';


@Component({
  selector: 'eat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() stories: Story[] = [];
  @Input() filters: Filter[] = [];

  constructor(private dialogService: DialogService,
    private storyUtils: StoryUtils) { }

  ngOnInit(): void { }

  getTodo() {
    let todo = this.storyUtils.filterLastHistory(this.stories, 'todo');
    return todo ? todo : null;
  }
  
  getInProgress() {
    let progress = this.storyUtils.filterLastHistory(this.stories, 'progress');
    return progress ? progress : null;
  }
  
  getDone() {
    let done = this.storyUtils.filterLastHistory(this.stories, 'done');
    return done ? done : null;
  }

  createStory() {
    this.dialogService.open({
      component: StoryCreateComponent,
      closable: true,
      data: {
        title: "Create new story",
      }
    }, 
    { hasBackdrop: true, width: '50%' });
    
  }

}
