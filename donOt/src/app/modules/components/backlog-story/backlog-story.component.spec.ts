import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogStoryComponent } from './backlog-story.component';

describe('BacklogStoryComponent', () => {
  let component: BacklogStoryComponent;
  let fixture: ComponentFixture<BacklogStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
