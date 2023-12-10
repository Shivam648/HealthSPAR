import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRegisterComponent } from './hospital-register.component';

describe('HospitalRegisterComponent', () => {
  let component: HospitalRegisterComponent;
  let fixture: ComponentFixture<HospitalRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalRegisterComponent]
    });
    fixture = TestBed.createComponent(HospitalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
