import { Injectable } from '@angular/core';
import { Status } from '../../app/eat/model/status.model';

export class Step {
  previous?: Step;
  next?: Step;

  num: number;
  status: Status;

  constructor(num: number, status: Status) {
    this.num = num;
    this.status = status;
  }

}


@Injectable({
  providedIn: 'root'
})
export class StoryWorkflowService {
  private steps: Step[] = [];

  applyWorkflow(steps: Step[]) {
    this.steps = steps;
  }
  
  getStep(status: Status) {
    return this.steps.find(s => s.status === status);
  }
  
}
