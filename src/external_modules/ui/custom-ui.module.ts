import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { MaterialComponentModule } from 'src/material/material-component/material-component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeShorcutsModule } from 'src/material/font-awesome/font-awesome-shorcuts.module';
import { ColorizeDirective } from './search-field/colorize.directive';

const COMPONENTS = [
  DialogComponent,
  SearchFieldComponent
];

@NgModule({
  declarations: [COMPONENTS, ColorizeDirective],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeShorcutsModule,
    MaterialComponentModule,
  ],
  exports: [COMPONENTS]
})
export class CustomUiModule { }
