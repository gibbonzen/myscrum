import { Component, OnInit } from '@angular/core';
import { Story } from '../model/story.model';
import { DbService } from 'src/firebase/db.service';
import { Subscription } from 'rxjs';

interface Tag {
  name: string,
  color: string
}

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
  storiesSubscription: Subscription;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.dbService.storiesSubject.subscribe(stories => this.stories = stories);
    this.dbService.emitStories();
  }

}
