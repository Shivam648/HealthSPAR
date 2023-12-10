import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfileComponent } from './display-profile.component';

describe('DisplayProfileComponent', () => {
  let component: DisplayProfileComponent;
  let fixture: ComponentFixture<DisplayProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayProfileComponent]
    });
    fixture = TestBed.createComponent(DisplayProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
