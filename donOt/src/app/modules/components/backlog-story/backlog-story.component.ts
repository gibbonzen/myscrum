import { Component, OnInit, Input } from '@angular/core';
import { ScrumElement } from 'src/app/models/scrum/ScrumElement';

@Component({
  selector: 'app-backlog-story',
  templateUrl: './backlog-story.component.html',
  styleUrls: ['./backlog-story.component.scss']
})
export class BacklogStoryComponent implements OnInit {
  @Input('doModel') model: ScrumElement;

  constructor() { }

  ngOnInit() {
    console.log(this.model.name)
  }

}
