import { Injectable } from '@angular/core';
import { BacklogManager } from './backlog-manager.service';

export interface ScrumFeatureManager {
  backlogManager: BacklogManager
  // sprintManager: SprintManager
  // sandboxManager:
}

@Injectable({
  providedIn: 'root'
})
export class ScrumManager implements ScrumFeatureManager {
  backlogManager: BacklogManager

  constructor(backlogManager: BacklogManager) {}
}
