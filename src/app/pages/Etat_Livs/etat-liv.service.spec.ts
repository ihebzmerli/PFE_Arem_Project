import { TestBed } from '@angular/core/testing';

import { EtatLivService } from './etat-liv.service';

describe('EtatLivService', () => {
  let service: EtatLivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatLivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
