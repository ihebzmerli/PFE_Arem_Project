import { TestBed } from '@angular/core/testing';

import { ExpideService } from './expide.service';

describe('ExpideService', () => {
  let service: ExpideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
