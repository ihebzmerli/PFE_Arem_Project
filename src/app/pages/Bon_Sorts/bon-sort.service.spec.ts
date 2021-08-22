import { TestBed } from '@angular/core/testing';

import { BonSortService } from './bon-sort.service';

describe('BonSortService', () => {
  let service: BonSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
