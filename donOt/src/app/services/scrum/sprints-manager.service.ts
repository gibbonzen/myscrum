import { ScrumElement, ScrumElementEvent } from '../../models/scrum/ScrumElement';
import { Injectable } from '@angular/core';
import { ScrumElementService } from '../scrum-element/scrum-element.service';
import { SocketEvent } from '../../models/socket/SocketEvent.model';
import { EventEmitter } from 'events';
import { Manager } from './manager.service';

@Injectable({
  providedIn: 'root'
})
export class SprintManager extends Manager {
  constructor(protected scrumService: ScrumElementService) {
    super(scrumService)
  }

  public addElement(el: ScrumElement) {
    if( el.sprint !== "backlog" )
        super.addElement(el)
    }
}
