import { NgModule } from '@angular/core';
import { BacklogStoryComponent } from './backlog-story/backlog-story.component';
import { MaterialModule } from 'src/app/material.module';
import { TooltipHoverButtonComponent } from './tooltip-hover-button/tooltip-hover-button.component';

@NgModule({
  declarations: [
    BacklogStoryComponent,
    TooltipHoverButtonComponent
  ],
  imports: [MaterialModule],
  exports: [
    BacklogStoryComponent,
    TooltipHoverButtonComponent
  ]
})
export class ComponentsModule { }
