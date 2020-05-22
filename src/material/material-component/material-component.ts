import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';


const materialComponents = [
  // Material
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatChipsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatSliderModule,
  MatTooltipModule,

  DragDropModule,
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialComponentModule { }
