import { TestBed } from '@angular/core/testing';

import { FinanceStore } from './finance.store';

describe('FinanceStore', () => {
  let service: FinanceStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
