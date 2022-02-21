import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerBasedTestComponent } from './timer-based-test.component';

describe('TimerBasedTestComponent', () => {
  let component: TimerBasedTestComponent;
  let fixture: ComponentFixture<TimerBasedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerBasedTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerBasedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
