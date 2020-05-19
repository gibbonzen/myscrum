import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/firebase/auth.service';
import { Step, StoryWorkflowService } from '../service/story/story-workflow.service';

// story workflow
// move to class
const TODO = new Step(0, 'todo');
const PROGRESS = new Step(1, 'progress');
const DONE = new Step(2, 'done');

TODO.next = PROGRESS;
PROGRESS.previous = TODO;
PROGRESS.next = DONE;
DONE.previous = PROGRESS;

const STEPS = [TODO, PROGRESS, DONE];


@Component({
  selector: 'eat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'post-eat';
  isAuth: boolean;

  constructor(private authService: AuthService,
    private workflowService: StoryWorkflowService) { }

  ngOnInit() {
    this.authService.onAuthStateChanged(user => {
      this.isAuth = user ? true : false;
    });

    this.workflowService.applyWorkflow(STEPS);

  }
}
