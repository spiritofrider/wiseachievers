import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAICareersComponent } from './new-aicareers.component';

describe('NewAICareersComponent', () => {
  let component: NewAICareersComponent;
  let fixture: ComponentFixture<NewAICareersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAICareersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAICareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
