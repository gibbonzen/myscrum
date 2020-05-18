import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

import * as firebase from 'firebase';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class FirebaseModule {
  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
