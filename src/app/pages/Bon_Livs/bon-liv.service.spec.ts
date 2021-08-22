import { TestBed } from '@angular/core/testing';

import { BonLivService } from './bon-liv.service';

describe('BonLivService', () => {
  let service: BonLivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonLivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
