import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { cambiosGuard } from './cambios-guard';

describe('cambiosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => cambiosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
