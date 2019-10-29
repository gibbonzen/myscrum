import { Injectable } from '@angular/core';
import { BacklogManager } from './backlog-manager.service';
import { SprintManager } from './sprints-manager.service';

export interface ScrumFeatureManager {
  backlogManager: BacklogManager
  sprintManager: SprintManager
  //sandboxManager:
}

@Injectable({
  providedIn: 'root'
})
export class ScrumManager implements ScrumFeatureManager {
  backlogManager: BacklogManager
  sprintManager: SprintManager

  constructor(backlogManager: BacklogManager, sprintManager: SprintManager) {}
}
