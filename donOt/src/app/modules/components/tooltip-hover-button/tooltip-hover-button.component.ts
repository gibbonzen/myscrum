import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tooltip-hover-button',
  templateUrl: './tooltip-hover-button.component.html',
  styleUrls: ['./tooltip-hover-button.component.scss']
})
export class TooltipHoverButtonComponent implements OnInit {
  @Input() color: string
  @Input() type: string

  constructor() { }

  ngOnInit() {
    
  }

}
