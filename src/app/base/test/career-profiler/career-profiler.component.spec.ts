import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerProfilerComponent } from './career-profiler.component';

describe('CareerProfilerComponent', () => {
  let component: CareerProfilerComponent;
  let fixture: ComponentFixture<CareerProfilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerProfilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerProfilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
