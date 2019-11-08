import { TestBed } from '@angular/core/testing';

import { VrService } from './vr.service';

describe('VrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VrService = TestBed.get(VrService);
    expect(service).toBeTruthy();
  });
});
