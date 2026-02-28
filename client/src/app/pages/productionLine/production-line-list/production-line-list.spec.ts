import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineList } from './production-line-list';

describe('ProductionLineList', () => {
  let component: ProductionLineList;
  let fixture: ComponentFixture<ProductionLineList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionLineList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionLineList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
