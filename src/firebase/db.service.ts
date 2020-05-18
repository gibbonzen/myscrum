import { Injectable } from '@angular/core';
import { Story } from 'src/app/eat/model/story.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() {
    this.getStories();
  }

  stories: Story[] = [];
  storiesSubject = new Subject<Story[]>();

  emitStories() {
    this.storiesSubject.next(this.stories);
  }

  saveStories() {
    firebase.database().ref('/stories').set(this.stories);
  }

  getStories() {
    firebase.database().ref('/stories')
      .on('value', (data: firebase.database.DataSnapshot) => {
        this.stories = data.val() ? data.val() : [];
        this.emitStories();
      });
  }

  getStory(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/stories' + id).once('value').then((data: firebase.database.DataSnapshot) => {
        resolve(data.val());
      }, err => reject(err));
    });
  }

  createStory(story: Story) {
    this.stories.push(story);
    this.saveStories();
    this.emitStories();
  }

  removeStory(story: Story) {
    const index = this.stories.findIndex(s => s === story);
    this.stories.splice(index, 1);
    this.saveStories();
    this.emitStories();
  }

}
