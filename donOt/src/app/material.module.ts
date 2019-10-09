import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule,
  MatMenuModule,
  MatDividerModule
  } from '@angular/material';

@NgModule({
  imports: [
  	MatButtonModule,
  	MatCheckboxModule,
  	MatInputModule,
  	MatIconModule,
  	MatDatepickerModule,
  	MatExpansionModule,
  	MatSlideToggleModule,
  	MatTooltipModule,
  	MatToolbarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    DragDropModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule
	],
  exports: [
  	MatButtonModule,
  	MatCheckboxModule,
  	MatInputModule,
  	MatIconModule,
  	MatDatepickerModule,
  	MatExpansionModule,
  	MatSlideToggleModule,
  	MatTooltipModule,
  	MatToolbarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    DragDropModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule
	],
})
export class MaterialModule { }
