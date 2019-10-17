import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestAnswerComponent } from './vacation-request-answer.component';

describe('VacationRequestAnswerComponent', () => {
  let component: VacationRequestAnswerComponent;
  let fixture: ComponentFixture<VacationRequestAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
