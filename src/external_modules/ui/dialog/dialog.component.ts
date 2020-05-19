import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Inject, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DialogPosition } from '@angular/material/dialog';

export interface DialogStyleConfig {
  hasBackdrop?: boolean;
  width?: string;
  height?: string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  position?: DialogPosition;
}

export interface DialogContentData<T> {
  component: any;
  data: T;
  style?: DialogStyleConfig;
  closable?: boolean;
}

export interface Closable {
  onClose: () => void;
}

@Component({
  selector: 'eat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('content', {read: ViewContainerRef, static: true}) ngContent: ViewContainerRef;
  private component: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public dialogModel: DialogContentData<any>) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory<DialogContentData<any>>(this.dialogModel.component); // component factory
    this.component = this.ngContent.createComponent(factory).instance; // instanciate component
    this.component.model = this.dialogModel.data; // set data to component
    
    if(this.dialogModel.closable) {
      this.component.onClose = () => this.close();
    }
  }
  
  close() {
    this.dialogRef.close();
  }

}
