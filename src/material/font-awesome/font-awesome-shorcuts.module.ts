import { NgModule, Component, Input, OnInit } from '@angular/core';

import * as faIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'faIcon',
  template: '<fa-icon [icon]="faIcon"></fa-icon>',
})
export class FaIconComponent implements OnInit {
  @Input() icon: string;
  faIcon: faIcons.IconDefinition;

  ngOnInit() {
    this.load();
  }

  load() {
    this.faIcon = faIcons[this.icon];
  }
}

@NgModule({
  declarations: [FaIconComponent],
  imports: [FontAwesomeModule],
  exports: [FaIconComponent]
})
export class FontAwesomeShorcutsModule { }
