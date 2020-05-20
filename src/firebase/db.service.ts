import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  save<T>(entity: string, data: T[]) {
    firebase.database().ref(`/${entity}`).set(data);
  }

  getAll<T>(entity: string, next: (data: T[]) => void) {
    firebase.database().ref(`/${entity}`).on('value', (data: firebase.database.DataSnapshot) => {
        next(data.val() ? data.val() : []);
      });
  }

  getOne(entity: string, id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/${entity}` + id).once('value').then((data: firebase.database.DataSnapshot) => {
        resolve(data.val());
      }, err => reject(err));
    });
  }

}
