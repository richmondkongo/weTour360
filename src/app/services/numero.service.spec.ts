import { TestBed } from '@angular/core/testing';

import { NumeroService } from './numero.service';

describe('NumeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumeroService = TestBed.get(NumeroService);
    expect(service).toBeTruthy();
  });
});
