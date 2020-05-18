import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../model/story.model';

@Component({
  selector: 'eat-story-table',
  templateUrl: './story-table.component.html',
  styleUrls: ['./story-table.component.scss']
})
export class StoryTableComponent implements OnInit {
  @Input() header: string;
  @Input() stories: Story[];

  constructor() { }

  ngOnInit(): void {
  }

}
