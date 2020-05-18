export interface Job {
  name: JobType,
  icon: EatIcon
}

export type JobType = 'dev' | 'tma' | 'support' | 'test';
export type EatIcon = 'settings_ethernet' | 'bug_report' | 'call' | 'done';