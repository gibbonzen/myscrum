import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BacklogManager } from 'src/app/services/scrum/backlog-manager.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, AfterViewInit {

  private visible = false
  description = new FormControl()

  constructor(private backlogManager: BacklogManager) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // console.log(this.backlogManager.getElements())
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
