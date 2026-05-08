import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCardComponent } from './balance-card.component.js';

describe('SummaryCardComponentTs', () => {
  let component: BalanceCardComponent;
  let fixture: ComponentFixture<BalanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
