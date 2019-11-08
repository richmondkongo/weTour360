import { TestBed } from '@angular/core/testing';

import { GroupeEntreprisesService } from './groupe-entreprises.service';

describe('GroupeEntreprisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupeEntreprisesService = TestBed.get(GroupeEntreprisesService);
    expect(service).toBeTruthy();
  });
});
