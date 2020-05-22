import { Component, OnInit } from '@angular/core';
import { Story } from '../model/story.model';
import { StoryService } from '../../../service/story/story.service';
import { FilterService } from 'src/service/story/filter.service';


@Component({
  selector: 'eat-scrum-board',
  templateUrl: './scrum-board.component.html',
  styleUrls: ['./scrum-board.component.scss']
})
export class ScrumBoardComponent implements OnInit {
  stories: Story[] = [];
  filteredStories: Story[] = [];

  constructor(private storyService: StoryService,
    private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.emitter.addListener(Story.classname, filters => this.computeFilters());

    this.storyService.subject.subscribe(stories => {
      this.stories = stories;
      this.computeFilters();
    });
    
    this.storyService.emit();
  }

  private computeFilters() {
    this.filteredStories = this.filterService.filter<Story>(this.stories, Story.classname);
  }

}
