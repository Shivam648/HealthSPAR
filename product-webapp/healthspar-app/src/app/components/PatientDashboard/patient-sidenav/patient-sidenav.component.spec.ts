import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSidenavComponent } from './patient-sidenav.component';

describe('PatientSidenavComponent', () => {
  let component: PatientSidenavComponent;
  let fixture: ComponentFixture<PatientSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientSidenavComponent]
    });
    fixture = TestBed.createComponent(PatientSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
