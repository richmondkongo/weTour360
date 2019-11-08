import { TestBed } from '@angular/core/testing';

import { BiensImmobiliersService } from './biens-immobiliers.service';

describe('BiensImmobiliersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiensImmobiliersService = TestBed.get(BiensImmobiliersService);
    expect(service).toBeTruthy();
  });
});
