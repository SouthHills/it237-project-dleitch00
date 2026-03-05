import {Component, effect, signal} from '@angular/core';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {Toast} from 'bootstrap';
import {VendorModel} from '../../../models/vendor.model';
import {VendorService} from '../../../services/vendor.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vendor-detail',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './vendor-detail.html',
  styleUrl: './vendor-detail.css',
})
export class VendorDetail {
  vendor = signal<VendorModel | null>(null);
  modifiedVendor = signal<VendorModel>({} as VendorModel);

  errorMessage = signal<string>('');
  isNewVendor = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Route parameter stored as a signal
  vendorID = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private router: Router
  )
  {                       // snapshot of the route when requesting the object
    this.vendorID.set(this.route.snapshot.paramMap.get('id'));

    effect(() =>
    {
      const id = this.vendorID();
      if (id === '-1')
      {
        this.isNewVendor.set(true);
        this.vendor.set(null);
        this.modifiedVendor.set({} as VendorModel);
      }
      else
      {
        this.isNewVendor.set(false);

        this.vendorService.getVendorById(Number(id)).subscribe({
          next: (data) => {
            this.vendor.set(data);
            this.modifiedVendor.set({ ...data }); // cloning for editing

            this.errorMessage.set('');

          },
          error: (error) => {
            this.errorMessage.set('Error fetching the vendor');
            if(error.error.redirectUrl)
            {
              this.router.navigate([error.error.redirectUrl]);
            }
            console.error('There was an error!', error);
          }
        });
      }


    });
  }

  saveChanges(): void
  {
    const currentVendor = this.modifiedVendor();

    if (this.isNewVendor())
    {
      if (
        !currentVendor.vendorID ||
        !currentVendor.vendorName ||
        !currentVendor.vendorSpecialization ||
        !currentVendor.vendorHqNation ||
        !currentVendor.vendorHqCity ||
        !currentVendor.vendorHqStreet ||
        !currentVendor.vendorHqZIP
      )
      {
        this.errorMessage.set('Values are required for all attributes');
        this.toastTitle.set('Error')
        this.toastMessage.set(this.errorMessage());
        this.showToast();
        return;
      }

      this.vendorService.addVendor(currentVendor).subscribe({
        next: (newVendor) =>
        {
          this.toastTitle.set('Vendor information');
          this.toastMessage.set('Vendor created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/vendors', newVendor.vendorID]));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating vendor: ', error);
          this.errorMessage.set('Error creating the vendor.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    // Update existing vendor
    this.vendorService.updateVendor(currentVendor).subscribe({
      next: (updatedVendor) =>
      {
        this.vendor.set({...updatedVendor });
        this.modifiedVendor.set({ ...updatedVendor });
        this.toastTitle.set('Vnedor Information');
        this.toastMessage.set('Vendor updated Successfully');
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

  deleteVendor(): void
  {
    const currentVendor = this.vendor();
    if(!currentVendor) return;

    const vendorID = currentVendor.vendorID;

    this.vendorService.deleteVendor(vendorID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Vendor Information');
        this.toastMessage.set('Vendor deleted successfully');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/vendors']);
        }, 2000)
      },
      error: (error) =>
      {
        console.error('Error deleting vendor', error);
        this.errorMessage.set('Error deleting the vendor.')
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
    const original = this.vendor();
    if(!original) return;

    this.modifiedVendor.set({ ...original }); // creates a deep copy

    this.toastTitle.set('Vendor Information');
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

