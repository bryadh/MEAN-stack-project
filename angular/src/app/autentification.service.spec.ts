import { TestBed } from '@angular/core/testing';

import { AutentificationService } from './autentification.service';

describe('AutentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutentificationService = TestBed.get(AutentificationService);
    expect(service).toBeTruthy();
  });
});
