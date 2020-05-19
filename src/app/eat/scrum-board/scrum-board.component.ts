import { Component, OnInit } from '@angular/core';
import { Story } from '../model/story.model';
import { StoryService } from '../../../service/story/story.service';
import { Tag } from '../model/tag.model';
import { Filter } from '../model/filter.model';


@Component({
  selector: 'eat-scrum-board',
  templateUrl: './scrum-board.component.html',
  styleUrls: ['./scrum-board.component.scss']
})
export class ScrumBoardComponent implements OnInit {

  tags: Tag[] = [
    { name: "#tag", color: "primary", },
    { name: "#waiting", color: "accent", },
    { name: "#gerald", color: "warn", },
    { name: "#syntax", color: "none", },
  ];

  stories: Story[] = [];
  filters: Filter[] = [];

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.storyService.subject.subscribe(stories => this.stories = stories);
    this.storyService.emit();
  }

}
