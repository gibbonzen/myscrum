import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipHoverButtonComponent } from './tooltip-hover-button.component';

describe('TooltipHoverButtonComponent', () => {
  let component: TooltipHoverButtonComponent;
  let fixture: ComponentFixture<TooltipHoverButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipHoverButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipHoverButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
