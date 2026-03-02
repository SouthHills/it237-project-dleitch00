import {Component, effect, signal} from '@angular/core';
import {ProductionLineModel} from '../../../models/productionline.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductionLineService} from '../../../services/productionline.service';
import {Toast} from 'bootstrap';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-production-line-details',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './production-line-details.html',
  styleUrl: './production-line-details.css',
  standalone: true
})
export class ProductionLineDetails {
  productionLine = signal<ProductionLineModel | null>(null);
  modifiedProductionLine = signal<ProductionLineModel>({} as ProductionLineModel);

  errorMessage = signal<string>('');
  isNewProductionLine = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Query params stored as a signal
  productID = signal<number | null>(null);
  plantID = signal<number | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productionLineService: ProductionLineService,
    private router: Router
  )
  {
    this.route.queryParamMap.subscribe((params) =>
    {
      const productIDParam = params.get('productID');
      const plantIDParam = params.get('plantID');

      if (productIDParam === null || plantIDParam === null)
      {
        this.errorMessage.set('Missing productID or plantID query parameters.');
        return;
      }

      const parsedProductID = Number(productIDParam);
      const parsedPlantID = Number(plantIDParam);

      if (Number.isNaN(parsedProductID) || Number.isNaN(parsedPlantID))
      {
        this.errorMessage.set('productID and plantID must be valid numbers.');
        return;
      }

      this.productID.set(parsedProductID);
      this.plantID.set(parsedPlantID);

      if (parsedProductID === -1 && parsedPlantID === -1)
      {
        this.isNewProductionLine.set(true);
        this.productionLine.set(null);
        this.modifiedProductionLine.set({} as ProductionLineModel);
        return;
      }

      this.isNewProductionLine.set(false);

      this.productionLineService.getProductionLineById(parsedProductID, parsedPlantID).subscribe({
        next: (data) =>
        {
          this.productionLine.set(data);
          this.modifiedProductionLine.set({ ...data });
          this.errorMessage.set('');
        },
        error: (error) =>
        {
          this.errorMessage.set('Error fetching the productionline.');
          console.error('There was an error!', error);
        }
      });
    });

    effect(() => {
      this.errorMessage();
    });
  }

  saveChanges(): void
  {
    const currentProductionLine = this.modifiedProductionLine();

    if (
      currentProductionLine.productID === undefined ||
      currentProductionLine.plantID === undefined ||
      currentProductionLine.productQuantity === undefined ||
      currentProductionLine.productMinimum === undefined
    )
    {
      this.errorMessage.set('Values are required for all attributes.');
      this.toastTitle.set('Error');
      this.toastMessage.set(this.errorMessage());
      this.showToast();
      return;
    }

    if (this.isNewProductionLine())
    {
      this.productionLineService.addProductionLine(currentProductionLine).subscribe({
        next: (newProductionLine) =>
        {
          this.toastTitle.set('Production Line');
          this.toastMessage.set('Production line created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/productionLine'], {
                queryParams: {
                  productID: newProductionLine.productID,
                  plantID: newProductionLine.plantID
                }
              }));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating production line: ', error);
          this.errorMessage.set('Error creating the production line.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    this.productionLineService.updateProductionLine(currentProductionLine).subscribe({
      next: (updatedProductionLine) =>
      {
        this.productionLine.set({ ...updatedProductionLine });
        this.modifiedProductionLine.set({ ...updatedProductionLine });
        this.toastTitle.set('Production Line');
        this.toastMessage.set('Production line updated successfully.');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the production line.');
        this.toastTitle.set('Error');
        this.toastMessage.set(this.errorMessage());
        this.showToast();
      }
    });
  }

  deleteProductionLine(): void
  {
    const currentProductionLine = this.productionLine();
    if (!currentProductionLine) return;

    this.productionLineService.deleteProductionLine(currentProductionLine.productID, currentProductionLine.plantID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Production Line');
        this.toastMessage.set('Production line deleted successfully.');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/productionLines']);
        }, 2000);
      },
      error: (error) =>
      {
        console.error('Error deleting production line', error);
        this.errorMessage.set('Error deleting the production line.');
        this.toastTitle.set('Error');
        this.toastMessage.set(this.errorMessage());
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.productionLine();
    if (!original) return;

    this.modifiedProductionLine.set({ ...original });

    this.toastTitle.set('Production Line');
    this.toastMessage.set('Changes discarded.');
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
