import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpDSidebarComponent } from './hcp-d-sidebar.component';

describe('HcpDSidebarComponent', () => {
  let component: HcpDSidebarComponent;
  let fixture: ComponentFixture<HcpDSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HcpDSidebarComponent]
    });
    fixture = TestBed.createComponent(HcpDSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
