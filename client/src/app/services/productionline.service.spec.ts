import { TestBed } from '@angular/core/testing';

import { ProductionlineService } from './productionline.service';

describe('ProductionlineService', () => {
  let service: ProductionlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
