import { TestBed } from '@angular/core/testing';

import { BonPrepService } from './bon-prep.service';

describe('BonPrepService', () => {
  let service: BonPrepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonPrepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
