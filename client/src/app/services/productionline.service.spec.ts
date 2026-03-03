import { TestBed } from '@angular/core/testing';

import { ProductionLineService } from './productionline.service';

describe('ProductionLineService', () => {
  let service: ProductionLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
