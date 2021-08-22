import { TestBed } from '@angular/core/testing';

import { FournisService } from './fournis.service';

describe('FournisService', () => {
  let service: FournisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
