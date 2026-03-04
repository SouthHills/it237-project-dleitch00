import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import {ProductModel} from '../../../models/product.model';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it ('should sort products by ID in ascending order', () => {
  // Arrange
  const products : {
    productID: number;
    productName: string;
    productPrice: number;
    productDescription: string;
    productProduced: string
  }[] = [
    { productID: 3, productName: 'Product C', productPrice: 30, productDescription: 'Description C', productProduced: 'Y' },
    { productID: 1, productName: 'Product A', productPrice: 10, productDescription: 'Description A', productProduced: 'Y' },
    { productID: 2, productName: 'Product B', productPrice: 20, productDescription: 'Description B', productProduced: 'Y' }

  ];
  component.products.set(products);

  // Act
  component.sortID();

  // Assert
  const sortedProducts = component.products();
  expect(sortedProducts[0].productID).toBe(1);
  expect(sortedProducts[1].productID).toBe(2);
  expect(sortedProducts[2].productID).toBe(3);
})
});
