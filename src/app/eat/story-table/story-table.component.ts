import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Status } from '../model/status.model';
import { StoryService } from '../../../service/story/story.service';
import { StoryUtils } from 'src/service/story/story-utils.service';

import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'eat-story-table',
  templateUrl: './story-table.component.html',
  styleUrls: ['./story-table.component.scss']
})
export class StoryTableComponent implements OnInit {
  @Input() header: string;
  @Input() stories: Story[];
  
  @Input() status: Status;
  @Input() accept: Status;


  constructor(private storyService: StoryService,
    private storyUtils: StoryUtils) { }

  ngOnInit(): void { }

  drop(event: CdkDragDrop<string>) {
    let previousContainer = event.previousContainer;
    let currentContainer = event.container;
    if(previousContainer === currentContainer) return;

    // moving
    let story: Story = event.item.data

    if(this.accept === this.storyUtils.getLastHistory(story.history).status) {
      console.log("Item accepted");

      this.storyUtils.updateStatus(story, this.status);
      
      if(env.production) {
        this.storyService.save();
      }
    }
    else {
      console.log("Item rejected");
    }
  }

}
