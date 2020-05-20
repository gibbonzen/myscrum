import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

const COMPONENTS = [
  DialogComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
  ],
  exports: [COMPONENTS]
})
export class CustomUiModule { }
