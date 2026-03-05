import {Component, effect, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Toast} from 'bootstrap';
import {BlueprintModel} from '../../../models/blueprint.model';
import {BlueprintService} from '../../../services/blueprint.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-blueprint-details',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './blueprint-details.html',
  styleUrl: './blueprint-details.css',
})
export class BlueprintDetails {
  blueprint = signal<BlueprintModel | null>(null);
  modifiedBlueprint = signal<BlueprintModel>({} as BlueprintModel);

  errorMessage = signal<string>('');
  isNewBlueprint = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Query params stored as a signal
  productID = signal<number | null>(null);
  componentID = signal<number | null>(null);

  constructor(
    private route: ActivatedRoute,
    private blueprintService: BlueprintService,
    private router: Router
  )
  {
    this.route.queryParamMap.subscribe((params) =>
    {
      const productIDParam = params.get('productID');
      const componentIDParam = params.get('componentID');

      if (productIDParam === null || componentIDParam === null)
      {
        this.errorMessage.set('Missing productID or componentID query parameters.');
        return;
      }

      const parsedProductID = Number(productIDParam);
      const parsedComponentID = Number(componentIDParam);

      if (Number.isNaN(parsedProductID) || Number.isNaN(parsedComponentID))
      {
        this.errorMessage.set('productID and componentID must be valid numbers.');
        return;
      }

      this.productID.set(parsedProductID);
      this.componentID.set(parsedComponentID);

      if (parsedProductID === -1 && parsedComponentID === -1)
      {
        this.isNewBlueprint.set(true);
        this.blueprint.set(null);
        this.modifiedBlueprint.set({} as BlueprintModel);
        return;
      }

      this.isNewBlueprint.set(false);

      this.blueprintService.getBlueprintById(parsedProductID, parsedComponentID).subscribe({
        next: (data) =>
        {
          this.blueprint.set(data);
          this.modifiedBlueprint.set({ ...data });
          this.errorMessage.set('');
        },
        error: (error) =>
        {
          this.errorMessage.set('Error fetching the blueprint.');
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
    const currentBlueprint = this.modifiedBlueprint();

    if (
      currentBlueprint.productID === undefined ||
      currentBlueprint.componentID === undefined ||
      currentBlueprint.componentAmount === undefined
    )
    {
      this.errorMessage.set('Values are required for all attributes.');
      this.toastTitle.set('Error');
      this.toastMessage.set(this.errorMessage());
      this.showToast();
      return;
    }

    if (this.isNewBlueprint())
    {
      this.blueprintService.addBlueprint(currentBlueprint).subscribe({
        next: (newBlueprint) =>
        {
          this.toastTitle.set('Blueprint');
          this.toastMessage.set('Blueprint created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/blueprint'], {
                queryParams: {
                  productID: newBlueprint.productID,
                  componentID: newBlueprint.componentID
                }
              }));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating blueprint: ', error);
          this.errorMessage.set('Error creating the blueprint.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    this.blueprintService.updateBlueprint(currentBlueprint).subscribe({
      next: (updatedBlueprint) =>
      {
        this.blueprint.set({ ...updatedBlueprint });
        this.modifiedBlueprint.set({ ...updatedBlueprint });
        this.toastTitle.set('Blueprint');
        this.toastMessage.set('Blueprint updated successfully.');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the blueprint.');
        this.toastTitle.set('Error');
        this.toastMessage.set(this.errorMessage());
        this.showToast();
      }
    });
  }

  deleteBlueprint(): void
  {
    const currentBlueprint = this.blueprint();
    if (!currentBlueprint) return;

    this.blueprintService.deleteBlueprint(currentBlueprint.productID, currentBlueprint.componentID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Blueprint');
        this.toastMessage.set('Blueprint deleted successfully.');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate([`/products/${currentBlueprint.productID}`]);
        }, 2000);
      },
      error: (error) =>
      {
        console.error('Error deleting blueprint', error);
        this.errorMessage.set('Error deleting the blueprint.');
        this.toastTitle.set('Error');
        this.toastMessage.set(this.errorMessage());
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.blueprint();
    if (!original) return;

    this.modifiedBlueprint.set({ ...original });

    this.toastTitle.set('Blueprint');
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
