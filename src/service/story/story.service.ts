import { Injectable } from '@angular/core';
import { DbService } from 'src/firebase/db.service';
import { Story } from '../../app/eat/model/story.model';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private _name: string = "stories";
  private _stories: Story[] = [];
  
  subject = new Subject<Story[]>();

  constructor(private dbService: DbService) {
    this.getAll();
  }

  emit() {
    this.subject.next(this._stories);
  }

  save() {
    this.dbService.save(this._name, this._stories);
  }
  
  getAll() {
    this.dbService.getAll<Story>(this._name, data => {
      this._stories = data;
      this._update();
    });
  }

  getOne(id: number) {
    return this.dbService.getOne(this._name, id);
  }

  create(story: Story) {
    this._stories.push(story);
    this._update();
  }

  remove(story: Story) {
    const index = this._stories.findIndex(s => s === story);
    this._stories.splice(index, 1);
    this._update();
  }

  private _update() {
    this.save();
    this.emit();
  }
  
}
