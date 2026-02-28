import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLineDetails } from './production-line-details';

describe('ProductionLineDetails', () => {
  let component: ProductionLineDetails;
  let fixture: ComponentFixture<ProductionLineDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionLineDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionLineDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
