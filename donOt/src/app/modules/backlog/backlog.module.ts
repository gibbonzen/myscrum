import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    BacklogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BacklogRoutingModule
  ],
  exports: [BacklogComponent]
})
export class BacklogModule { }
