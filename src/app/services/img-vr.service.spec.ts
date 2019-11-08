import { TestBed } from '@angular/core/testing';

import { ImgVrService } from './img-vr.service';

describe('ImgVrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgVrService = TestBed.get(ImgVrService);
    expect(service).toBeTruthy();
  });
});
