import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    SprintComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SprintRoutingModule
  ],
  exports: [SprintComponent]
})
export class SprintModule { }
