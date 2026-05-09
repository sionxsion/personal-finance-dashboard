import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExpenseChart } from './category-expense-chart.component';

describe('CategoryExpenseChart', () => {
  let component: CategoryExpenseChart;
  let fixture: ComponentFixture<CategoryExpenseChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryExpenseChart],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryExpenseChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
