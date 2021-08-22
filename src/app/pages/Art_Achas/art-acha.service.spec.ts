import { TestBed } from '@angular/core/testing';

import { ArtAchaService } from './art-acha.service';

describe('ArtAchaService', () => {
  let service: ArtAchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtAchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
