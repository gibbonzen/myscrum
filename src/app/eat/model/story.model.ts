import { History } from './history.model';
import { Job } from './job.model';
import { User } from 'firebase';

export class Story {
  name: string;
  description: string;
  history: History[] = [];

  constructor(name: string, description: string, job: Job, user?: User) {
    this.name = name;
    this.description = description;
    this.history.push({
      date: Date.now(),
      job: job,
      status: "todo"
    });
  }

}