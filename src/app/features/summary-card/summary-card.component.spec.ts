import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardComponentTs } from './summary-card.component.js';

describe('SummaryCardComponentTs', () => {
  let component: SummaryCardComponentTs;
  let fixture: ComponentFixture<SummaryCardComponentTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponentTs],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponentTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
