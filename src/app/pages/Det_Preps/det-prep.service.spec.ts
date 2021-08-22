import { TestBed } from '@angular/core/testing';

import { DetPrepService } from './det-prep.service';

describe('DetPrepService', () => {
  let service: DetPrepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetPrepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
