import { TestBed } from '@angular/core/testing';

import { HospitalImageService } from './hospital-image.service';

describe('HospitalImageService', () => {
  let service: HospitalImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
