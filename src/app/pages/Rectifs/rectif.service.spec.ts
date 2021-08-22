import { TestBed } from '@angular/core/testing';

import { RectifService } from './rectif.service';

describe('RectifService', () => {
  let service: RectifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
