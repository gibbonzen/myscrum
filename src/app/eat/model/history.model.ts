import { Status } from './status.model';
import { Job } from './job.model';

export interface History {
  job: Job,
  user?: string,
  status: Status,
  date: number,
  remarque?: string[],
  attachments?: string[]
}