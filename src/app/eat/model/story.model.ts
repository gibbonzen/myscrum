import { History } from './history.model';
import { Job } from './job.model';
import { User } from 'firebase';
import { Filterable, StaticImplements } from './filter.model';
import { Tools } from 'src/service/story/tools';

@StaticImplements<Filterable<Story>>()
export class Story {
  static classname: string = `Story_${Tools.uuid()}`;

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

  static empty(): Story {
    return new Story(null, null, null);
  }

}