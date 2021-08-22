import { TestBed } from '@angular/core/testing';

import { DetEmbaService } from './det-emba.service';

describe('DetEmbaService', () => {
  let service: DetEmbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetEmbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
