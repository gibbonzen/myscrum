import { TestBed } from '@angular/core/testing';

import { ScrumElementService } from './scrum-element.service';

describe('ScrumElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrumElementService = TestBed.get(ScrumElementService);
    expect(service).toBeTruthy();
  });
});
