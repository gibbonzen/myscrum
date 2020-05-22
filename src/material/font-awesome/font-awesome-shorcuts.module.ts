import { NgModule, Component, Input, OnInit } from '@angular/core';

import * as faIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'faIcon',
  template: '<fa-icon [icon]="faIcon" [size]="size" fixedWidth=true></fa-icon>',
})
export class FaIconComponent implements OnInit {
  @Input() icon: string;
  @Input() size: "xs" | "sm" | "lg" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" = "lg";
  faIcon: faIcons.IconDefinition;

  ngOnInit() {
    if(this.icon.indexOf("-") !== -1)
      this.icon = this.icon.split("-").reduce((a, b) => a + this.capitalize(b));

    this.load();
  }

  load() {
    this.faIcon = faIcons[this.icon];
  }

  capitalize(value: string) {
    let one = value.substr(0, 1).toUpperCase();
    return one + value.substr(1);
  }

}

@NgModule({
  declarations: [FaIconComponent],
  imports: [FontAwesomeModule],
  exports: [FaIconComponent]
})
export class FontAwesomeShorcutsModule { }
