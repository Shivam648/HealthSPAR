import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpDHeaderComponent } from './hcp-d-header.component';

describe('HcpDHeaderComponent', () => {
  let component: HcpDHeaderComponent;
  let fixture: ComponentFixture<HcpDHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HcpDHeaderComponent]
    });
    fixture = TestBed.createComponent(HcpDHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
