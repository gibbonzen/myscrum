export interface Job {
  name: JobType
}

export type JobType = 'dev' | 'tma' | 'support' | 'test';
export type EatIcon = 'settings_ethernet' | 'bug_report' | 'call' | 'done';

export function getIcon(job: Job) {
  switch (job.name) {
    case 'dev':
      return 'fa-code';
    case 'tma':
      return 'fa-bug';
    case 'test':
      return 'fa-check';
    case 'support':
      return 'fa-phone';
    default:
      return 'fa-question';
  }
}