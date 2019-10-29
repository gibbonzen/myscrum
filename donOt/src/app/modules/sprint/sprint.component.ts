import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SprintManager } from 'src/app/services/scrum/sprints-manager.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit, AfterViewInit {

  private visible = false
  description = new FormControl()

  constructor(private sprintManager: SprintManager) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // console.log(this.sprintManager.getElements())
  }

  displayTextArea(el) {
    this.visible = true
    this.description.setValue(el.description)
  }

  update(el) {
    el.description = this.description.value
    this.visible = false
  }
}
