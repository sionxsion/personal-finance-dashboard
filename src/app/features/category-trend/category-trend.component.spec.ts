import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTrendComponent } from './category-trend.component';

describe('CategoryTrendComponent', () => {
  let component: CategoryTrendComponent;
  let fixture: ComponentFixture<CategoryTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTrendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTrendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
