import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPageComponent } from './hospital-page.component';

describe('HospitalPageComponent', () => {
  let component: HospitalPageComponent;
  let fixture: ComponentFixture<HospitalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalPageComponent]
    });
    fixture = TestBed.createComponent(HospitalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
