import {Component, effect, signal} from '@angular/core';
import {ProductModel} from '../../../models/product.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Toast} from 'bootstrap';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {ComponentModel} from '../../../models/component.model';
import {BlueprintModel} from '../../../models/blueprint.model';
import {ComponentService} from '../../../services/component.service';
import {BlueprintService} from '../../../services/blueprint.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = signal<ProductModel | null>(null);
  modifiedProduct = signal<ProductModel>({} as ProductModel);

  errorMessage = signal<string>('');
  isNewProduct = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Route parameter stored as a signal
  productID = signal<string | null>(null);

  components = signal<ComponentModel[]>([]);
  blueprints = signal<BlueprintModel[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private componentService: ComponentService,
    private blueprintService: BlueprintService
  )
  {                       // snapshot of the route when requesting the object
    this.productID.set(this.route.snapshot.paramMap.get('id'));

    effect(() =>
    {
      const id = this.productID();
      if (id === '-1')
      {
        this.isNewProduct.set(true);
        this.product.set(null);
        this.modifiedProduct.set({} as ProductModel);
      }
      else
      {
        this.isNewProduct.set(false);

        this.productService.getProductById(Number(id)).subscribe({
          next: (data) => {
            this.product.set(data);
            this.modifiedProduct.set({ ...data }); // cloning for editing

            this.errorMessage.set('');

          },
          error: (error) => {
            this.errorMessage.set('Error fetching the product');
            console.error('There was an error!', error);
          }
        });

        this.componentService.getComponents().subscribe({
          next: (data ) => {
            console.log(data);
            this.components.set(data)
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.errorMessage.set('Error fetching components.');
          }
        });

        this.blueprintService.getBlueprint().subscribe({
          next: (data ) => {
            console.log(data);
            this.blueprints.set(data)
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.errorMessage.set('Error fetching blueprints.');
          }
        });

      }


    });
  }

  blueprintForCurrentProduct()
  {
    const blueprints = [];
    const directions = {
      componentName: '',
      componentDescription: '',
      componentAmount: 0
    }



  }

  saveChanges(): void
  {
    const currentProduct = this.modifiedProduct();

    if (this.isNewProduct())
    {
      if (
        !currentProduct.productID ||
        !currentProduct.productDescription ||
        currentProduct.productPrice === undefined ||
        currentProduct.productPrice === null ||
        !currentProduct.productName ||
        !currentProduct.productProduced
      )
      {
        this.errorMessage.set('Values are required for all attributes except Vendor Code(V_CODE)');
        this.toastTitle.set('Error')
        this.toastMessage.set(this.errorMessage());
        this.showToast();
        return;
      }

      console.log(currentProduct);

      this.productService.addProduct(currentProduct).subscribe({
        next: (newProduct) =>
        {
          this.toastTitle.set('Product information');
          this.toastMessage.set('Product created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/products', newProduct.productID]));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating product: ', error);
          this.errorMessage.set('Error creating the product.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
        }
      });

      return;
    }

    // Update existing product
    this.productService.updateProduct(currentProduct).subscribe({
      next: (updatedProduct) =>
      {
        this.product.set({...updatedProduct });
        this.modifiedProduct.set({ ...updatedProduct });
        this.toastTitle.set('Product Information');
        this.toastMessage.set('Product updated Successfully');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the product');
        this.toastTitle.set('Error');
        this.toastMessage.set('Error updating the product');
        this.showToast();
      }
    });
  }

  deleteProduct(): void
  {
    const currentProduct = this.product();
    if(!currentProduct) return;

    const productID = currentProduct.productID;

    this.productService.deleteProduct(productID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Product Information');
        this.toastMessage.set('Product deleted successfully');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/products']);
        }, 2000)
      },
      error: (error) =>
      {
        console.error('Error deleting product', error);
        this.errorMessage.set('Error deleting the product.')
        this.toastTitle.set('Error');
        this.toastMessage.set(
          this.errorMessage() + ' (Is it being referenced by another entity?)0'
        );
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.product();
    if(!original) return;

    this.modifiedProduct.set({ ...original }); // creates a deep copy

    this.toastTitle.set('Product Information');
    this.toastMessage.set('Changes discarded');
    this.showToast();
  }

  private showToast(): void
  {
    const toast = document.getElementById('toast');

    if (toast)
    {
      const toastBootstrap = Toast.getOrCreateInstance(toast);
      toastBootstrap.show();
    }
  }

}
