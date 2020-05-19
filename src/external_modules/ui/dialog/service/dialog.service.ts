import { Injectable } from '@angular/core';
import { DialogContentData, DialogComponent, DialogStyleConfig } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open<T>(data: DialogContentData<T>, style?: DialogStyleConfig) {
    let config = { data: data };
    Object.keys(style).forEach(k => config[k] = style[k]);

    const dialogRef = this.dialog.open(DialogComponent, config);
    return dialogRef;
  }
}
