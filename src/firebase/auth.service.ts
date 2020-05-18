import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => resolve(), err => reject(err));
    });
  }

  onAuthStateChanged(onChange: (user: firebase.User) => void) {
    firebase.auth().onAuthStateChanged(onChange);
  }

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => resolve(), err => reject(err));
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

}
