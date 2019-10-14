import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestListComponent } from './vacation-request-list.component';

describe('VacationRequestListComponent', () => {
  let component: VacationRequestListComponent;
  let fixture: ComponentFixture<VacationRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
