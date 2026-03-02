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

}
