import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accesosireGuard } from './accessoire-guard';

describe('accessoireGuard', () => {
  function executeGuard(...guardParameters: Parameters<CanActivateFn>) {
    return TestBed.runInInjectionContext(() => accesosireGuard(...guardParameters));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

