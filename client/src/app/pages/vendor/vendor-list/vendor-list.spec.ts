import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../app.routes';

import { vi } from 'vitest';
import { Router } from '@angular/router';

import { VendorList } from './vendor-list';

describe('VendorList', () => {
  let component: VendorList;
  let fixture: ComponentFixture<VendorList>;

  const router = { navigate: vi.fn() } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorList, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorList);
    component = fixture.componentInstance;
  });

  it('should call router.navigate with vendor ID', () => {
    // Arrange
    const vendorID = 123;

    // Act
    component.viewVendorDetails(vendorID);

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/vendors', vendorID]);


  });
});
