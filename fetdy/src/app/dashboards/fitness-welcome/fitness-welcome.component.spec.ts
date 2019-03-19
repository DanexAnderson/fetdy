import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessWelcomeComponent } from './fitness-welcome.component';

describe('FitnessWelcomeComponent', () => {
  let component: FitnessWelcomeComponent;
  let fixture: ComponentFixture<FitnessWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
