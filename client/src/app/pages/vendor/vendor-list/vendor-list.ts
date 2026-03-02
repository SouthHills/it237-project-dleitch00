import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {VendorModel} from '../../../models/vendor.model';
import {VendorService} from '../../../services/vendor.service';
import {Spinner} from '../../../components/loading/spinner/spinner';

@Component({
  selector: 'app-vendor-list',
  imports: [Spinner],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css',
  standalone: true
})
export class VendorList {
  vendors = signal<VendorModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private vendorService: VendorService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.vendorService.getVendors().subscribe({
        next: (data ) => this.vendors.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching vendors.');
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewVendorDetails(vendorID: number){
    this.router.navigate(['/vendors', vendorID])
  }

}

