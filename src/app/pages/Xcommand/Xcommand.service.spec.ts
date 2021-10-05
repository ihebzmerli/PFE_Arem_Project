import { TestBed } from '@angular/core/testing';

import { XcommandService } from './Xcommand.service';

describe('XcommandService', () => {
  let service: XcommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
