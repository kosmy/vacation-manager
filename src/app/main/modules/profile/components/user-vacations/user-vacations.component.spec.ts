import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacationsComponent } from './user-vacations.component';

describe('UserVacationsComponent', () => {
  let component: UserVacationsComponent;
  let fixture: ComponentFixture<UserVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
