import { Component, OnInit } from '@angular/core';
import { ScrumElementService } from 'src/app/services/scrum-element/scrum-element.service';
import { SocketEvents } from 'src/app/models/socket/SocketEvents.model';
import { BacklogManager } from 'src/app/services/BacklogManager';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  constructor(private scrumService: ScrumElementService,
    private backlogManager: BacklogManager) { }

  ngOnInit() {
    this.scrumService.on(SocketEvents.SCRUM_ELEMENT_ADDED, el => this.backlogManager.addElements(el))
  }


}
