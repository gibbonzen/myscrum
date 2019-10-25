import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';

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

    ReactiveFormsModule,
    FlexLayoutModule
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

    ReactiveFormsModule,
    FlexLayoutModule
	],
})
export class MaterialModule { }
