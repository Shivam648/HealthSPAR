import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsListComponent } from './appointments-list.component';

describe('AppointmentsListComponent', () => {
  let component: AppointmentsListComponent;
  let fixture: ComponentFixture<AppointmentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsListComponent]
    });
    fixture = TestBed.createComponent(AppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
