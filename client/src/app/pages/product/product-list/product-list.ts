import {Component, effect, signal} from '@angular/core';
import {ProductModel} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {Spinner} from '../../../components/loading/spinner/spinner';

@Component({
  selector: 'app-product-list',
  imports: [
    CurrencyPipe,
    Spinner
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true
})
export class ProductList {
  products = signal<ProductModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private productService: ProductService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.productService.getProducts().subscribe({
        next: (data ) => this.products.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching products.');
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewProductDetails(productID: number){
    this.router.navigate(['/products', productID])
  }

  idSort = false;

  sortID()
  {
     if (this.idSort)
     {
      const sortedProducts = [...this.products()].sort((a, b) => b.productID - a.productID);
      this.products.set(sortedProducts);
      this.idSort = false;
      return;
     }
      const sortedProducts = [...this.products()].sort((a, b) => a.productID - b.productID);
      this.idSort = true;
      this.products.set(sortedProducts);
  }

  nameSort = false;

  sortName()
  {
    if (this.nameSort)
    {
      const sortedProducts = [...this.products()].sort((a, b) => b.productName.localeCompare(a.productName));
      this.products.set(sortedProducts);
      this.nameSort = false;
      return;
    }
    const sortedProducts = [...this.products()].sort((a, b) => a.productName.localeCompare(b.productName));
    this.nameSort = true;
    this.products.set(sortedProducts);
  }

  priceSort = false;

  sortPrice()
  {
    if (this.priceSort)
    {
      const sortedProducts = [...this.products()].sort((a, b) => b.productPrice - a.productPrice);
      this.products.set(sortedProducts);
      this.priceSort = false;
      return;
    }
    const sortedProducts = [...this.products()].sort((a, b) => a.productPrice - b.productPrice);
    this.priceSort = true;
    this.products.set(sortedProducts);
  }

  producedSort = false;

  sortProduced()
  {
    if (this.producedSort)
    {
      const sortedProducts = [...this.products()].sort((a, b) => b.productProduced.localeCompare(a.productProduced));
      this.products.set(sortedProducts);
      this.producedSort = false;
      return;
    }
    const sortedProducts = [...this.products()].sort((a, b) => a.productProduced.localeCompare(b.productProduced));
    this.producedSort = true;
    this.products.set(sortedProducts);
  }

  descriptionSort = false;

  sortDescription()
  {
    if (this.descriptionSort)
    {
      const sortedProducts = [...this.products()].sort((a, b) => b.productDescription.localeCompare(a.productDescription));
      this.products.set(sortedProducts);
      this.descriptionSort = false;
      return;
    }
    const sortedProducts = [...this.products()].sort((a, b) => a.productDescription.localeCompare(b.productDescription));
    this.descriptionSort = true;
    this.products.set(sortedProducts);
  }

}
