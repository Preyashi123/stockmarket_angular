import { TestBed } from '@angular/core/testing';

import { SharedservicemapService } from './sharedservicemap.service';

describe('SharedservicemapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedservicemapService = TestBed.get(SharedservicemapService);
    expect(service).toBeTruthy();
  });
});
