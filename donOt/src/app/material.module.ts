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
  MatDividerModule,
  MatCardModule,
  MatFormFieldModule
  } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,

    ReactiveFormsModule
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
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    
    ReactiveFormsModule
	],
})
export class MaterialModule { }
